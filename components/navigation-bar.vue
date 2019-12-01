<template>
  <b-navbar toggleable="md" class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <b-navbar-brand to="/">
        <img src="/images/logo.png" class="logo" alt="Zestful logo" />
      </b-navbar-brand>

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
            class="accent-link"
            href="https://rapidapi.com/zestfuldata/api/recipe-and-ingredient-analysis"
          >
            Get Started
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar',
};
</script>

<style scoped>
.custom-navbar {
  background: #673ab7;
  border-bottom: 1px solid #b29bda;
  margin-bottom: 30px;
}

.custom-navbar .nav-link {
  color: white;
}

.custom-navbar .accent-link a {
  color: #ffd740;
}

.logo {
  max-height: 47px;
}
</style>
