<template>
  <b-card
    no-body
    :class="'mb-4 shadow pricing-card' + ' pricing-card-' + variant"
  >
    <b-card-header>
      <h4 class="my-0 font-weight-normal">
        {{ title }}
      </h4>
    </b-card-header>
    <b-card-body class="d-flex flex-column inner-body">
      <b-card-title>
        {{ price }}
      </b-card-title>
      <b-card-text>
        <b-list-group flush>
          <b-list-group-item v-for="feature in features" :key="feature">
            {{ feature }}
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
      <b-button
        :to="buttonTo"
        class="btn-lg btn-block align-self-end"
        :href="buttonHref"
        :variant="variant"
      >
        {{ buttonText }}
      </b-button>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'PricingCard',
  props: {
    title: String,
    price: String,
    features: Array,
    buttonTo: String,
    buttonHref: String,
    buttonText: String,
    variant: String,
  },
};
</script>

<style scoped>
.card-title {
  font-size: 2em;
  text-align: center;
}

.card-body {
  padding: 0px;
}

.inner-body {
  padding: 10px;
}

.pricing-card .card-header {
  text-align: center;
}

.pricing-card-primary {
  background: rgb(201, 255, 208);
}

.pricing-card-primary .list-group-item {
  background: rgb(211, 255, 217);
}

.pricing-card-primary .card-header {
  background: rgb(104, 247, 152);
}

.btn {
  margin-top: auto;
}
</style>
