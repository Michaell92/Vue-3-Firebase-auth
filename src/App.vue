<template>
  <the-header></the-header>
  <router-view />
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import LandingPage from "./pages/LandingPage.vue";

// Firebase data
import fb from "./firebase.js";

export default {
  components: {
    TheHeader,
    LandingPage
  },
  data() {
    return {
      active: false
    }

  },
  computed: {
    // Get general messages from store
    userMessages() {
      return this.$store.getters
        .messages;
    },
  },
  mounted() {

    // FIREBASE METHODS
    const order = fb.orderByKey
    const limitFirst = fb.limitToFirst
    const limitLast = fb.limitToLast

    // Get data from local storage if any
    const userData = localStorage.getItem('userData')
    console.log(JSON.parse(userData))
    if (userData) {
      // Update store user settings
      this.$store.dispatch("changeUserSettings", JSON.parse(userData))
    }

    // Data path
    const data = fb.ref(
      fb.database,
      "chatMessages"
    );

    // DATA
    const getData = (num) => fb.query(data, order(), limitLast(num))

    if (this.userMessages.length === 0) {
      fb.get(getData(15)).then(snapshot => {
        if (snapshot.exists()) {
          const messages = snapshot.val()

          // Check if messages are already there
          this.$store.dispatch(
            "updateMessages",
            messages
          );

        } else {
          // console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    // Add listener for messages on database
    fb.onValue(getData(1), (snapshot) => {
      const messages = snapshot.val()

      if (this.active) {
        this.$store.dispatch(
          "updateMessages",
          messages
        );
      }
      // console.log(this.userMessages, messages)
      this.active = true
    });
  }
};
</script>

<style lang="scss">
@import "./scss/style";
</style>
