<template>
  <chat-box
    :messages="userMessages"
    category="general"
  ></chat-box>
</template>

<script>
import ChatBox from "../ui/ChatBox.vue";
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
};
</script>
