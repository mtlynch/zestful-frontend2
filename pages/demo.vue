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
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      const url = `https://zestful:8888/parseIngredients`;
      this.$axios
        .$post(url, {
          ingredients: [this.form.ingredient],
        })
        .then(result => {
          console.log('got results!');
          for (result of result.data.results) {
            console.log(result.ingredientRaw);
          }
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.ingredient = '';
    },
  },
};
</script>
