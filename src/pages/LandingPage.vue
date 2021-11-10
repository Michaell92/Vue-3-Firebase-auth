<template>
  <div id="landingPage">
    <!-- Navigation  -->
    <nav id="nav-left">
      <ul>
        <li>
          <img
            src="../assets/arrow.svg"
            alt="arrow-image"
            class="arrow"
            v-if="
              showArrow('/generalchat')
            "
          />
          <router-link to="/generalchat"
            >General chat</router-link
          >
        </li>
        <li>
          <img
            src="../assets/arrow.svg"
            alt="arrow-image"
            class="arrow"
            v-if="
              showArrow('/messages')
            "
          />
          <router-link to="/generalchat"
            >Messages</router-link
          >
        </li>
        <li>
          <img
            src="../assets/arrow.svg"
            alt="arrow-image"
            class="arrow"
            v-if="
              showArrow('/preferences')
            "
          />
          <router-link to="/generalchat"
            >Preferences</router-link
          >
        </li>
      </ul>
    </nav>
    <!-- Main section -->
    <main id="landingPage-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    showArrow() {
      return (link) => {
        if (link === this.$route.path) {
          return true;
        }
      };
    },
  },
  mounted() {
    console.log(this.$route.path);
  },
};
</script>
