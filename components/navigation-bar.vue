<template>
  <b-navbar
    toggleable="md"
    class="navbar navbar-expand-lg navbar-light bg-light"
  >
    <b-navbar-brand v-b-toggle.nav-collapse class="navbar-brand" to="/"
      >Zestful</b-navbar-brand
    >

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/">
          About
        </b-nav-item>
        <b-nav-item to="/demo">
          Demo
        </b-nav-item>
        <b-nav-item to="/pricing">
          Pricing
        </b-nav-item>
        <b-nav-item to="/docs">
          Docs
        </b-nav-item>
        <b-nav-item
          href="https://rapidapi.com/zestfuldata/api/recipe-and-ingredient-analysis"
        >
          Get Started
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

<style scoped>
.navbar-brand {
  margin: 10px 20px 10px 0px;
}

.navbar-custom {
  color: #ffffff;
  background-color: #cc3333;
}
</style>
