<template>
  <div>
    <h1>Developer Demo</h1>

    <b-form class="ingredient-form" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Enter a recipe ingredient below to see how Zestful's ingredient parser
      works:"
        label-for="ingredient-input"
      >
        <b-form-input
          id="ingredient-input"
          v-model="form.ingredient"
          class="ingredient-input"
          type="text"
          required
          placeholder="Enter ingredient"
        />
      </b-form-group>

      <b-button
        :disabled="isWaitingForParseResult"
        type="submit"
        class="btn-lg"
        variant="primary"
        >Parse</b-button
      >
      <b-button
        :disabled="isWaitingForParseResult"
        type="reset"
        class="btn-lg"
        variant="outline-primary"
        >Reset</b-button
      >
    </b-form>

    <div
      v-if="isWaitingForParseResult"
      class="spinner-border text-success"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>

    <div v-if="backendError" class="alert alert-warning" role="alert">
      Failed to communicate with Zestful server: {{ backendError }}
    </div>

    <template v-if="!ingredientParsed && !isWaitingForParseResult">
      <p>Or choose an example below:</p>
      <div class="example-inputs">
        <b-button
          v-for="input in exampleInputs"
          :key="input"
          class="example-input"
          variant="primary"
          @click="
            form.ingredient = input;
            parseIngredient(input);
          "
          >{{ input }}</b-button
        >
      </div>
    </template>

    <b-card-group
      v-if="ingredientParsed && !isWaitingForParseResult"
      class="parsed-cards"
      deck
    >
      <b-card v-if="ingredientParsed.quantity !== null" class="shadow">
        <b-card-title>
          {{ ingredientParsed.quantity | number('0.0') | simplifyDecimal }}
        </b-card-title>
        <b-card-sub-title>quantity</b-card-sub-title>
      </b-card>
      <b-card
        v-if="ingredientParsed.unit"
        class="shadow"
        :title="ingredientParsed.unit"
        sub-title="units"
      />
      <b-card
        v-if="ingredientParsed.productSizeModifier"
        class="shadow"
        :title="ingredientParsed.productSizeModifier"
        sub-title="product size modifier"
      />
      <b-card
        v-if="ingredientParsed.product"
        class="shadow"
        :title="ingredientParsed.product"
        sub-title="product"
      />
      <b-card
        v-if="ingredientParsed.preparationNotes"
        class="shadow"
        :title="ingredientParsed.preparationNotes"
        sub-title="preparation instructions"
      />
    </b-card-group>

    <b-card-group
      v-if="
        ingredientParsed &&
        ingredientParsed.usdaInfo &&
        !isWaitingForParseResult
      "
      class="usda-match-cards"
      deck
    >
      <b-card
        class="shadow-sm"
        :title="ingredientParsed.usdaInfo.description"
        sub-title="USDA match"
      >
        <b-card-body class="usda-link">
          <a
            :href="`https://fdc.nal.usda.gov/fdc-app.html#/food-details/${ingredientParsed.usdaInfo.fdcId}/nutrients`"
            variant="primary-outline"
            >View on USDA FoodCentral</a
          >
        </b-card-body>
      </b-card>
    </b-card-group>

    <b-card-group
      v-if="confidence !== null && !isWaitingForParseResult"
      class="confidence-cards"
      deck
    >
      <b-card class="shadow-sm">
        <b-card-title
          >{{ (confidence * 100.0) | number('0.00') }}%</b-card-title
        >
        <b-card-sub-title>confidence</b-card-sub-title>
      </b-card>
    </b-card-group>

    <b-card-group
      v-if="requestsRemaining !== null && !isWaitingForParseResult"
      class="requests-remaining"
      deck
    >
      <b-card class="shadow-sm">
        <b-card-title>{{ requestsRemaining }}</b-card-title>
        <b-card-sub-title>free requests remaining</b-card-sub-title>
      </b-card>
    </b-card-group>

    <div v-if="curlCmd" class="code-example">
      <h2>
        Calling Zestful via
        <span class="code">curl</span>
      </h2>

      <pre class="curl-snippet shadow">{{ curlCmd }}</pre>
    </div>
    <div v-if="pythonSnippet" class="code-example">
      <h2>
        Calling Zestful via Python
      </h2>

      <pre class="python-snippet shadow">{{ pythonSnippet }}</pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

Vue.filter('simplifyDecimal', function (value) {
  return value.replace('.0', '');
});

export default {
  computed: {
    curlCmd: function () {
      if (!this.ingredientRawReflected) {
        return null;
      }
      const ingredientEscaped = this.ingredientRawReflected.replace(
        /'/g,
        "\\'"
      );
      return `
curl \\
  --header "Content-Type: application/json" \\
  --data '{
    "ingredients": [
      "${ingredientEscaped}"
    ]
  }' \\
  "${process.env.backendUrl}/parseIngredients"
`.trim();
    },
    pythonSnippet: function () {
      if (!this.ingredientRawReflected) {
        return null;
      }
      const ingredientEscaped = this.ingredientRawReflected.replace(
        /'/g,
        "\\'"
      );
      return `
import json
import parse_ingredient # pip install zestful-parse-ingredient

ingredient = parse_ingredient.parse('${ingredientEscaped}')
print(json.dumps(ingredient.as_dict()))
`.trim();
    },
  },
  data() {
    return {
      form: {
        ingredient: '',
      },
      ingredientParsed: null,
      confidence: null,
      ingredientRawReflected: null,
      requestsRemaining: null,
      isWaitingForParseResult: false,
      backendError: null,
      exampleInputs: [
        '2 1/2 tablespoons finely chopped parsley',
        '½ tsp brown sugar',
        '3 large Granny Smith apples',
      ],
    };
  },
  methods: {
    parseIngredient(ingredient) {
      this.isWaitingForParseResult = true;
      const url = `${process.env.backendUrl}/parseIngredients`;
      this.$axios
        .$post(url, {
          ingredients: [ingredient],
        })
        .then((response) => {
          this.ingredientParsed = response.results[0].ingredientParsed;
          this.confidence = response.results[0].confidence;
          this.ingredientRawReflected = response.results[0].ingredientRaw;
          if (typeof response.requestsRemaining !== 'undefined') {
            this.requestsRemaining = response.requestsRemaining;
          }
          this.backendError = null;
        })
        .catch((error) => {
          this.backendError = error;
        })
        .finally(() => {
          this.isWaitingForParseResult = false;
        });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.parseIngredient(this.form.ingredient);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.ingredient = '';
      this.ingredientParsed = null;
      this.confidence = null;
      this.ingredientRawReflected = null;
      this.requestsRemaining = null;
      this.isWaitingForParseResult = false;
      this.backendError = null;
    },
  },
  head: {
    title: 'Ingredient Parsing Demo',
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 60px;
}

.code {
  font-family: 'Courier New', Courier, monospace;
}

.ingredient-form {
  margin-bottom: 50px;
}

.ingredient-input {
  margin: 40px 0px 20px 0px;
}

.example-inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media screen and (min-width: 768px) {
  .example-inputs {
    flex-direction: row;
  }
}

.example-input {
  font-family: Consolas, 'Courier New', Courier, monospace;
  padding: 25px 20px;
  color: black;
  background: #8e79c4;
  border: 0px;
  margin-bottom: 30px;
}

@media screen and (min-width: 768px) {
  .example-input {
    margin-bottom: 0px;
  }
}

.card-deck {
  margin-top: 50px;
}

>>> .card h4 {
  font-family: Roboto;
}

.usda-match-cards >>> .card {
  background: rgb(177, 228, 162);
}

.usda-link {
  padding: 8px 0px;
}

.confidence-cards >>> .card {
  background: rgb(177, 241, 250);
}

@media screen and (min-width: 768px) {
  .confidence-cards >>> .card {
    max-width: 130px;
  }
}

.requests-remaining >>> .card {
  background: rgb(250, 245, 177);
}

@media screen and (min-width: 768px) {
  .requests-remaining >>> .card {
    max-width: 220px;
  }
}

.code-example pre {
  display: inline-block;
  margin-top: 1rem;
  background: rgb(219, 219, 219);
  border: 1px solid black;
  padding: 1rem;
}
</style>
