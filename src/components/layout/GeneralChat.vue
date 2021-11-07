<template>
  <chat-box
    :messages="userMessages"
    category="general"
  ></chat-box>
</template>

<script>
import ChatBox from "../ui/ChatBox.vue";
// Firebase data
import fb from "../../firebase.js";

export default {
  components: {
    ChatBox,
  },
  computed: {
    // Get general messages from store
    userMessages() {
      return this.$store.getters
        .messages;
    },
  },
  mounted() {
    // Get database data
    // Data path
    const data = fb.ref(
      fb.database,
      "chatMessages"
    );

    // Add listener for messages on database
    fb.onValue(data, (snapshot) => {
      this.$store.dispatch(
        "updateMessages",
        snapshot.val()
      );

      console.log(snapshot.val());
    });
  },
};
</script>
