<template>
  <!-- Chatbox structure -->
  <div id="chatBoxContainer">
    <div id="wrapper">
      <div id="messages">
        <user-message
          v-for="message in messages"
          :key="message"
          :message="message"
          :date="date"
        ></user-message>
      </div>
    </div>

    <!-- Submit message form -->
    <div id="commentBox">
      <form
        @submit.prevent="submitMessage"
      >
        <textarea
          type="text"
          ref="commentBox"
          v-model="message"
          @keydown="adjustHeight"
        />
        <input
          type="submit"
          class="button-primary"
          id="submitButton"
          value="Send"
        />
      </form>
    </div>
  </div>
</template>

<script>
import UserMessage from "./UserMessage.vue";
export default {
  components: {
    UserMessage,
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: "",
      date: "",
    };
  },
  computed: {},
  methods: {
    //   Submit message to general messages store
    submitMessage() {
      if (
        this.category === "general" &&
        this.message
      ) {
        this.$store.dispatch(
          "updateMessages",
          this.message
        );

        // Add message date
        this.date =
          new Date().toUTCString();

        //   Remove message
        this.message = "";
      }
    },
    // Adjust hight of the comment box
    adjustHeight() {
      const comment =
        this.$refs.commentBox;

      if (
        comment.scrollHeight < 100 &&
        comment.scrollHeight > 35
      ) {
        // Set height
        comment.style.height =
          comment.scrollHeight + "px";

        // Remove scroll bar
        comment.style.overflow =
          "hidden";
      }

      if (comment.scrollHeight > 100) {
        // Add scroll bar
        comment.style.overflow = "auto";
      }
    },
  },
};
</script>
