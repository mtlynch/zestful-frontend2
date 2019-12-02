<template>
  <b-navbar toggleable="md" class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <b-navbar-brand to="/">
        <img src="/images/logo.png" class="logo" alt="Zestful logo" />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item class="standard-link" to="/">
            About
          </b-nav-item>
          <b-nav-item class="standard-link" to="/demo">
            Demo
          </b-nav-item>
          <b-nav-item class="standard-link" to="/pricing">
            Pricing
          </b-nav-item>
          <b-nav-item class="standard-link" to="/docs">
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
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
      },
    ],
  },
};
</script>

<style scoped>
.custom-navbar {
  background: #673ab7;
  border-bottom: 1px solid #b29bda;
  margin-bottom: 30px;
}

.custom-navbar .nav-item a {
  font-family: Roboto;
  font-size: 11pt;
  padding: 6px 20px;
}

.custom-navbar .standard-link a {
  color: white;
}

.custom-navbar .standard-link a:hover {
  background: #0000002a;
  color: rgb(196, 196, 196);
}

.custom-navbar .accent-link:hover {
  background: #ffd6401f;
}

.custom-navbar .accent-link a {
  color: #ffd740;
}

.custom-navbar .accent-link a:hover {
  color: #ffd740;
}

.custom-navbar .nav-item .nuxt-link-exact-active {
  color: rgb(238, 255, 0);
}

.logo {
  max-height: 47px;
}
</style>
