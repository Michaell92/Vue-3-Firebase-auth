<template>
  <the-header></the-header>
  <router-view />
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import LandingPage from "./pages/LandingPage.vue";
export default {
  components: {
    TheHeader,
    LandingPage
  }
};
</script>

<style lang="scss">
@import "./scss/style";
</style>
