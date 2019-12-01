<template>
  <div class="pricing">
    <h1>Pricing</h1>
    <b-card-group deck>
      <PricingCard
        title="Trial"
        price="$0"
        :features="['30 ingredient parses per day', 'E-mail support']"
        buttonTo="/demo"
        buttonText="Try for Free"
        variant="outline-primary"
      />
      <PricingCard
        title="Professional"
        price="$0.02 / ingredient"
        :features="['Managed hosting', 'Priority e-mail and phone support']"
        buttonHref="https://rapidapi.com/zestfuldata/api/recipe-and-ingredient-analysis"
        buttonText="Sign Up Now"
        variant="primary"
      />
      <PricingCard
        title="Enterprise"
        price="Flat Fee"
        :features="[
          'Self-hosted or private managed server',
          'Unlimited ingredient parses',
          'Priority e-mail and phone support',
        ]"
        buttonHref="mailto:michael@zestfuldata.com"
        buttonText="Contact Us"
        variant="outline-primary"
      />
    </b-card-group>
  </div>
</template>

<script>
import PricingCard from '../components/pricing-card';

export default {
  head: {
    title: 'Pricing',
  },
  components: {
    PricingCard,
  },
};
</script>
