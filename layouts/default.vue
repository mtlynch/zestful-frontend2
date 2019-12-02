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
  link: [
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css?family=Calistoga|Rubik|Roboto&display=swap',
    },
  ],
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
  font-family: 'Calistoga', serif;
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
