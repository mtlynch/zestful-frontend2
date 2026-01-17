---
title: "Ingredient Parsing Demo"
type: "demo"
url: "/demo/"
body_class: "demo"
include_demo_script: true
---

# Developer Demo

<form class="ingredient-form" id="ingredient-form">
  <div class="form-group" id="input-group-1">
    <label for="ingredient-input">
      Enter a recipe ingredient below to see how Zestful's ingredient parser
      works:
    </label>
    <input
      id="ingredient-input"
      class="form-control ingredient-input"
      type="text"
      required
      placeholder="Enter ingredient"
    />
  </div>

  <button id="parse-button" type="submit" class="btn btn-primary btn-lg">
    Parse
  </button>
  <button id="reset-button" type="reset" class="btn btn-outline-primary btn-lg">
    Reset
  </button>
</form>

<div id="loading-spinner" class="spinner-border text-success" role="status" hidden>
  <span class="sr-only">Loading...</span>
</div>

<section id="example-section">
  <p>Or choose an example below:</p>
  <div class="example-inputs">
    <button
      class="btn btn-primary example-input"
      type="button"
      data-example="2 1/2 tablespoons finely chopped parsley"
    >
      2 1/2 tablespoons finely chopped parsley
    </button>
    <button class="btn btn-primary example-input" type="button" data-example="½ tsp brown sugar">
      ½ tsp brown sugar
    </button>
    <button class="btn btn-primary example-input" type="button" data-example="3 large Granny Smith apples">
      3 large Granny Smith apples
    </button>
  </div>
</section>

<div id="quota-alert" class="alert alert-warning" role="alert" hidden>
  <p>
    You have used up your available free ingredient parses on the Zestful demo
    server.
  </p>
  <p>
    To continue using Zestful, purchase a
    <a href="/pricing/">subscription</a>.
  </p>
</div>
<div id="backend-alert" class="alert alert-warning" role="alert" hidden>
  Failed to communicate with Zestful server:
  <span id="backend-error"></span>
</div>

<div id="parsed-cards" class="card-deck parsed-cards" hidden></div>
<div id="usda-cards" class="card-deck usda-match-cards" hidden></div>
<div id="confidence-cards" class="card-deck confidence-cards" hidden></div>
<div id="requests-cards" class="card-deck requests-remaining" hidden></div>

<div id="curl-example" class="code-example" hidden>
  <h2>
    Calling Zestful via
    <span class="code">curl</span>
  </h2>
  <pre class="curl-snippet shadow" id="curl-snippet"></pre>
</div>
<div id="python-example" class="code-example" hidden>
  <h2>Calling Zestful via Python</h2>
  <pre class="python-snippet shadow" id="python-snippet"></pre>
</div>
