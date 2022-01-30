<template>
  <div class="pricing">
    <h1>Pricing</h1>
    <b-card-group deck>
      <PricingCard
        title="Trial"
        price="$0"
        :features="['30 ingredient parses per day', 'E-mail support']"
        button-to="/demo"
        button-text="Try for Free"
        variant="outline-primary"
      />
      <PricingCard
        title="Professional"
        price="$0.02 / ingredient"
        :features="['Managed hosting', 'Priority e-mail and phone support']"
        button-href="https://rapidapi.com/zestfuldata/api/recipe-and-ingredient-analysis"
        button-text="Sign Up Now"
        variant="primary"
      />
      <PricingCard
        title="Enterprise"
        price="Flat Fee"
        :features="[
          'Private managed server',
          'Unlimited ingredient parses',
          'Priority e-mail and phone support',
        ]"
        button-href="mailto:michael@zestfuldata.com"
        button-text="Contact Us"
        variant="outline-primary"
      />
    </b-card-group>
  </div>
</template>

<script>
import PricingCard from '../components/pricing-card';

export default {
  components: {
    PricingCard,
  },
  head: {
    title: 'Pricing',
  },
};
</script>
