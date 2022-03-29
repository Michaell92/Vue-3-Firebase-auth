<template>
  <div class="title" style="margin-bottom: auto">General Chat</div>
  <chat-box :messages="userMessages" category="general"></chat-box>
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

    // FIREBASE METHODS
    const order = fb.orderByKey
    const limitFirst = fb.limitToFirst
    const limitLast = fb.limitToLast
    let active = false

    // Data path
    const data = fb.ref(
      fb.database,
      "chatMessages"
    );

    // DATA
    const getData = (num) => fb.query(data, order(), limitLast(num))

    fb.get(getData(15)).then(snapshot => {

      if (snapshot.exists()) {
        const messages = snapshot.val()

        // Check if messages are already there
        if (!(this.$store.getters.messages.length > 1)) {
          this.$store.dispatch(
            "updateMessages",
            messages
          );
        }

      } else {
        // console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    // Add listener for messages on database
    fb.onValue(getData(1), (snapshot) => {
      const messages = snapshot.val()

      if (active) {
        this.$store.dispatch(
          "updateMessages",
          messages
        );
      }

      active = true
    });

  },
};
</script>
