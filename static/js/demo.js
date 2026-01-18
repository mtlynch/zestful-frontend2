(() => {
  const loadConfig = async () => {
    const response = await fetch("/config.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    if (!data || !data.BACKEND_URL) {
      throw new Error("BACKEND_URL missing in config.json");
    }
    return data.BACKEND_URL;
  };

  const init = async () => {
    let backendUrl;
    try {
      backendUrl = (await loadConfig()).replace(/\/$/, "");
    } catch (error) {
      const banner = document.createElement("div");
      banner.className = "alert alert-warning";
      banner.setAttribute("role", "alert");
      banner.textContent = `Failed to load config.json: ${
        error.message || error
      }`;
      document.body.insertBefore(banner, document.body.firstChild);
      return;
    }

    const form = document.getElementById("ingredient-form");
    const input = document.getElementById("ingredient-input");
    const parseButton = document.getElementById("parse-button");
    const resetButton = document.getElementById("reset-button");
    const spinner = document.getElementById("loading-spinner");
    const exampleSection = document.getElementById("example-section");
    const exampleButtons = document.querySelectorAll(".example-input");
    const quotaAlert = document.getElementById("quota-alert");
    const backendAlert = document.getElementById("backend-alert");
    const backendError = document.getElementById("backend-error");
    const parsedCards = document.getElementById("parsed-cards");
    const usdaCards = document.getElementById("usda-cards");
    const confidenceCards = document.getElementById("confidence-cards");
    const requestsCards = document.getElementById("requests-cards");
    const curlExample = document.getElementById("curl-example");
    const curlSnippet = document.getElementById("curl-snippet");
    const pythonExample = document.getElementById("python-example");
    const pythonSnippet = document.getElementById("python-snippet");

    let isWaiting = false;
    let isQuotaExhausted = false;
    let ingredientParsed = null;
    let ingredientRawReflected = null;
    let confidence = null;
    let requestsRemaining = null;

    const setHidden = (el, hidden) => {
      if (!el) return;
      el.hidden = hidden;
    };

    const setDisabled = (el, disabled) => {
      if (!el) return;
      el.disabled = disabled;
    };

    const resetState = () => {
      ingredientParsed = null;
      ingredientRawReflected = null;
      confidence = null;
      requestsRemaining = null;
      isWaiting = false;
      isQuotaExhausted = false;
      backendError.textContent = "";
      setHidden(quotaAlert, true);
      setHidden(backendAlert, true);
      clearCardDeck(parsedCards);
      clearCardDeck(usdaCards);
      clearCardDeck(confidenceCards);
      clearCardDeck(requestsCards);
      setHidden(parsedCards, true);
      setHidden(usdaCards, true);
      setHidden(confidenceCards, true);
      setHidden(requestsCards, true);
      setHidden(curlExample, true);
      setHidden(pythonExample, true);
      updateControls();
    };

    const updateControls = () => {
      setHidden(spinner, !isWaiting);
      setDisabled(input, isWaiting || isQuotaExhausted);
      setDisabled(parseButton, isWaiting || isQuotaExhausted);
      setDisabled(resetButton, isWaiting || isQuotaExhausted);
      exampleButtons.forEach((button) => {
        setDisabled(button, isWaiting || isQuotaExhausted);
      });
      setHidden(exampleSection, Boolean(ingredientParsed) || isWaiting);
    };

    const clearCardDeck = (deck) => {
      if (!deck) return;
      while (deck.firstChild) {
        deck.removeChild(deck.firstChild);
      }
    };

    const formatQuantity = (value) => {
      if (value === null || value === undefined) return null;
      if (typeof value !== "number") return String(value);
      return value.toFixed(3).replace(/\.?0+$/g, "");
    };

    const formatPercent = (value) => {
      if (value === null || value === undefined) return null;
      return `${(value * 100).toFixed(2)}%`;
    };

    const escapeSingleQuotes = (value) => value.replace(/'/g, "\\'");

    const renderParsedCards = () => {
      clearCardDeck(parsedCards);
      if (!ingredientParsed) {
        setHidden(parsedCards, true);
        return;
      }

      const cards = [];

      if (ingredientParsed.quantity !== null) {
        cards.push({
          title: formatQuantity(ingredientParsed.quantity),
          subtitle: "quantity",
        });
      }
      if (ingredientParsed.unit) {
        cards.push({ title: ingredientParsed.unit, subtitle: "units" });
      }
      if (ingredientParsed.productSizeModifier) {
        cards.push({
          title: ingredientParsed.productSizeModifier,
          subtitle: "product size modifier",
        });
      }
      if (ingredientParsed.product) {
        cards.push({ title: ingredientParsed.product, subtitle: "product" });
      }
      if (ingredientParsed.preparationNotes) {
        cards.push({
          title: ingredientParsed.preparationNotes,
          subtitle: "preparation instructions",
        });
      }

      cards.forEach((card) => {
        parsedCards.appendChild(buildCard(card.title, card.subtitle));
      });

      setHidden(parsedCards, cards.length === 0);
    };

    const renderUsdaCard = () => {
      clearCardDeck(usdaCards);
      if (!ingredientParsed || !ingredientParsed.usdaInfo) {
        setHidden(usdaCards, true);
        return;
      }

      const card = document.createElement("div");
      card.className = "card shadow-sm";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const title = document.createElement("h4");
      title.className = "card-title";
      title.textContent = ingredientParsed.usdaInfo.description;

      const subtitle = document.createElement("h6");
      subtitle.className = "card-subtitle mb-2 text-muted";
      subtitle.textContent = "USDA match";

      const linkWrapper = document.createElement("div");
      linkWrapper.className = "usda-link";

      const link = document.createElement("a");
      link.href = `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${ingredientParsed.usdaInfo.fdcId}/nutrients`;
      link.textContent = "View on USDA FoodCentral";

      linkWrapper.appendChild(link);
      cardBody.appendChild(title);
      cardBody.appendChild(subtitle);
      cardBody.appendChild(linkWrapper);
      card.appendChild(cardBody);
      usdaCards.appendChild(card);

      setHidden(usdaCards, false);
    };

    const renderConfidenceCard = () => {
      clearCardDeck(confidenceCards);
      if (confidence === null || confidence === undefined) {
        setHidden(confidenceCards, true);
        return;
      }
      const card = buildCard(formatPercent(confidence), "confidence");
      confidenceCards.appendChild(card);
      setHidden(confidenceCards, false);
    };

    const renderRequestsRemaining = () => {
      clearCardDeck(requestsCards);
      if (requestsRemaining === null || requestsRemaining === undefined) {
        setHidden(requestsCards, true);
        return;
      }
      const card = buildCard(
        String(requestsRemaining),
        "free requests remaining",
      );
      requestsCards.appendChild(card);
      setHidden(requestsCards, false);
    };

    const renderCodeExamples = () => {
      if (!ingredientRawReflected) {
        setHidden(curlExample, true);
        setHidden(pythonExample, true);
        return;
      }

      const escapedIngredient = escapeSingleQuotes(ingredientRawReflected);
      curlSnippet.textContent = `curl \\\n  --header "Content-Type: application/json" \\\n  --data '{\n    "ingredients": [\n      "${escapedIngredient}"\n    ]\n  }' \\\n  "${backendUrl}/parseIngredients"`;

      pythonSnippet.textContent = `import json\nimport parse_ingredient # pip install zestful-parse-ingredient\n\ningredient = parse_ingredient.parse('${escapedIngredient}')\nprint(json.dumps(ingredient.as_dict()))`;

      setHidden(curlExample, false);
      setHidden(pythonExample, false);
    };

    const buildCard = (titleText, subtitleText) => {
      const card = document.createElement("div");
      card.className = "card shadow";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body text-center";

      const title = document.createElement("h4");
      title.className = "card-title";
      title.textContent = titleText;

      const subtitle = document.createElement("h6");
      subtitle.className = "card-subtitle text-muted";
      subtitle.textContent = subtitleText;

      cardBody.appendChild(title);
      cardBody.appendChild(subtitle);
      card.appendChild(cardBody);

      return card;
    };

    const renderAll = () => {
      renderParsedCards();
      renderUsdaCard();
      renderConfidenceCard();
      renderRequestsRemaining();
      renderCodeExamples();
    };

    const handleError = (message) => {
      backendError.textContent = message;
      setHidden(backendAlert, false);
    };

    const parseIngredient = async (ingredient) => {
      if (!ingredient) return;
      isWaiting = true;
      setHidden(backendAlert, true);
      setHidden(quotaAlert, true);
      updateControls();

      try {
        const response = await fetch(`${backendUrl}/parseIngredients`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: [ingredient] }),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          if (String(data.error).toLowerCase().includes("insufficient quota")) {
            isQuotaExhausted = true;
            setHidden(quotaAlert, false);
          } else {
            handleError(data.error);
          }
          return;
        }

        const result = data.results && data.results[0];
        if (!result || result.error) {
          handleError(result && result.error ? result.error : "Unknown error");
          return;
        }

        ingredientParsed = result.ingredientParsed;
        confidence = result.confidence;
        ingredientRawReflected = result.ingredientRaw;
        requestsRemaining =
          typeof data.requestsRemaining !== "undefined"
            ? data.requestsRemaining
            : null;

        renderAll();
      } catch (error) {
        handleError(error.message || String(error));
      } finally {
        isWaiting = false;
        updateControls();
      }
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      parseIngredient(input.value.trim());
    });

    form.addEventListener("reset", (event) => {
      event.preventDefault();
      input.value = "";
      resetState();
    });

    exampleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const value = button.dataset.example || button.textContent.trim();
        input.value = value;
        parseIngredient(value);
      });
    });

    resetState();
  };

  init();
})();
