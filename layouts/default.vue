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
};
</script>
