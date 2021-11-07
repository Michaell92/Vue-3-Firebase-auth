<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  mounted() {
    // fb.set(
    //   fb.ref(fb.database, "test/"),
    //   {
    //     user: "test3",
    //   }
    // );
  },
};
</script>

<style lang="scss">
@import "./scss/style";
</style>
