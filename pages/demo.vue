<template>
  <div>
    <h1>Developer Demo</h1>

    <b-form class="ingredient-form" @submit="onSubmit" @reset="onReset">
      <b-form-group
        id="input-group-1"
        label="Enter a recipe ingredient below to see how Zestful's ingredient parser
      works:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.ingredient"
          type="text"
          required
          placeholder="Enter ingredient"
        />
      </b-form-group>

      <b-button type="submit" variant="primary">
        Parse
      </b-button>
      <b-button type="reset" variant="outline-primary">
        Reset
      </b-button>
    </b-form>

    <div v-if="!ingredientParsed" class="example-inputs">
      <b-button
        v-for="input in exampleInputs"
        :key="input"
        class="example-input"
        variant="primary"
        @click="
          form.ingredient = input;
          parseIngredient(input);
        "
      >
        {{ input }}
      </b-button>
    </div>

    <b-card-group v-if="ingredientParsed" class="parsed-cards" deck>
      <b-card v-if="ingredientParsed.quantity !== null" class="shadow">
        <b-card-title>
          {{ ingredientParsed.quantity | number('0.0') | simplifyDecimal }}
        </b-card-title>
        <b-card-sub-title>
          quantity
        </b-card-sub-title>
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
      v-if="ingredientParsed && ingredientParsed.usdaInfo"
      class="usda-match-cards"
      deck
    >
      <b-card
        class="shadow-sm"
        :title="ingredientParsed.usdaInfo.description"
        sub-title="USDA match"
      >
        <b-button
          :href="
            `https://fdc.nal.usda.gov/fdc-app.html#/food-details/${ingredientParsed.usdaInfo.fdcId}/nutrients`
          "
          variant="primary"
        >
          View on USDA FoodCentral
        </b-button>
      </b-card>
    </b-card-group>

    <b-card-group v-if="confidence !== null" class="confidence-cards" deck>
      <b-card class="shadow-sm">
        <b-card-title>
          {{ (confidence * 100.0) | number('0.00') }}%
        </b-card-title>
        <b-card-sub-title>
          confidence
        </b-card-sub-title>
      </b-card>
    </b-card-group>

    <div v-if="curlCmd" class="curl-example">
      <h2>Calling Zestful via <span class="code">curl</span></h2>

      <pre class="curl-snippet shadow">{{ curlCmd }}</pre>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

Vue.filter('simplifyDecimal', function(value) {
  return value.replace('.0', '');
});

export default {
  computed: {
    curlCmd: function() {
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
  "${this.backendUrl}/parseIngredients"
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
      exampleInputs: [
        '2 1/2 tablespoons finely chopped parsley',
        '½ tsp brown sugar',
        '3 large Granny Smith apples',
      ],
      // TODO: Replace with environmnet variable.
      backendUrl: 'http://zestful:8888',
    };
  },
  methods: {
    parseIngredient(ingredient) {
      const url = `${this.backendUrl}/parseIngredients`;
      this.$axios
        .$post(url, {
          ingredients: [ingredient],
        })
        .then(response => {
          this.ingredientParsed = response.results[0].ingredientParsed;
          this.confidence = response.results[0].confidence;
          this.ingredientRawReflected = response.results[0].ingredientRaw;
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
    },
  },
  head: {
    title: 'Demo',
  },
};
</script>

<style scoped>
.code {
  font-family: 'Courier New', Courier, monospace;
}

.ingredient-form {
  margin-bottom: 50px;
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
}

.card-deck {
  margin-top: 50px;
}

.curl-example pre {
  margin-top: 20px;
  background: rgb(219, 219, 219);
  border: 1px solid black;
  padding: 15px;
}
</style>
