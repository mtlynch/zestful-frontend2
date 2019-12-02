<template>
  <div>
    <h1>Developer Demo</h1>

    <b-form @submit="onSubmit" @reset="onReset">
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
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Parse</b-button>
      <b-button type="reset" variant="outline-primary">Reset</b-button>
    </b-form>

    <div class="example-inputs container">
      <b-button
        class="example-input"
        variant="primary"
        v-for="input in exampleInputs"
        v-bind:key="input"
        @click="form.ingredient = input"
        >{{ input }}</b-button
      >
    </div>

    <p v-if="result && result.ingredientParsed.product">
      {{ result.ingredientParsed.product }}
    </p>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Demo',
  },
  data() {
    return {
      form: {
        ingredient: '',
      },
      result: null,
      exampleInputs: [
        '2 1/2 tablespoons finely chopped parsley',
        '½ tsp brown sugar',
        '3 large Granny Smith apples',
      ],
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const url = `http://zestful:8888/parseIngredients`;
      this.$axios
        .$post(url, {
          ingredients: [this.form.ingredient],
        })
        .then(response => {
          this.result = response.results[0];
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.ingredient = '';
    },
  },
};
</script>

<style scoped>
.example-inputs {
  display: flex;
  justify-content: space-around;
  margin: 30px 0px;
}

.example-input {
  font-family: Consolas, 'Courier New', Courier, monospace;
  padding: 10px 15px;
  color: black;
  background: #8e79c4;
  border: 0px;
}
</style>
