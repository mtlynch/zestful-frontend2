<template>
  <div class="app">
    <NavigationBar />
    <nuxt class="container" />
  </div>
</template>

<script>
import NavigationBar from '../components/navigation-bar';

export default {
  components: {
    NavigationBar,
  },
  head() {
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://zestfuldata.com' + this.$route.path,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Jost|Rubik|Roboto&display=swap',
        },
      ],
    };
  },
};
</script>

<style>
body {
  font-family: 'Rubik', sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: 'Jost', serif;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  margin-top: 70px;
  margin-bottom: 30px;
}

h3 {
  margin-top: 40px;
  margin-bottom: 15px;
}
</style>
