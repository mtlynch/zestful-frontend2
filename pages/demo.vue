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
      <b-card
        v-if="ingredientParsed.quantity"
        class="shadow"
        footer="quantity"
        footer-tag="footer"
      >
        <b-card-title>
          {{ ingredientParsed.quantity | number('1.0-2') }}
        </b-card-title>
      </b-card>
      <b-card
        v-if="ingredientParsed.unit"
        class="shadow"
        :title="ingredientParsed.unit"
        footer="units"
        footer-tag="footer"
      />
      <b-card
        v-if="ingredientParsed.productSizeModifier"
        class="shadow"
        :title="ingredientParsed.productSizeModifier"
        footer="product size modifier"
        footer-tag="footer"
      />
      <b-card
        v-if="ingredientParsed.product"
        class="shadow"
        :title="ingredientParsed.product"
        footer="product"
        footer-tag="footer"
      />
      <b-card
        v-if="ingredientParsed.preparationNotes"
        class="shadow"
        :title="ingredientParsed.preparationNotes"
        footer="preparation instructions"
        footer-tag="footer"
      />
    </b-card-group>
  </div>
</template>

<script>
import Vue from 'vue';
import Vue2Filters from 'vue2-filters';

Vue.use(Vue2Filters);

export default {
  data() {
    return {
      form: {
        ingredient: '',
      },
      ingredientParsed: null,
      exampleInputs: [
        '2 1/2 tablespoons finely chopped parsley',
        '½ tsp brown sugar',
        '3 large Granny Smith apples',
      ],
    };
  },
  methods: {
    parseIngredient(ingredient) {
      const url = `http://zestful:8888/parseIngredients`;
      this.$axios
        .$post(url, {
          ingredients: [ingredient],
        })
        .then(response => {
          this.ingredientParsed = response.results[0].ingredientParsed;
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
    },
  },
  head: {
    title: 'Demo',
  },
};
</script>

<style scoped>
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
</style>
