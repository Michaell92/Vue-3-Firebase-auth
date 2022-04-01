<template>
  <div class="title" style="margin-bottom: auto">General Chat</div>
  <chat-box :messages="userMessages" category="general"></chat-box>
</template>

<script>
import ChatBox from "../ui/ChatBox.vue";

export default {
  components: {
    ChatBox,
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

};
</script>
