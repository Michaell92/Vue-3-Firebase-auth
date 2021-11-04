<template>
  <!-- Chatbox structure -->
  <div id="chatBoxContainer">
    <div id="wrapper">
      <div id="messages">
        <user-message
          v-for="message in messages"
          :key="message.date"
          :content="message.content"
          :date="message.date"
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
          v-model="content"
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
      content: "",
      message: {},
    };
  },
  computed: {},
  methods: {
    //   Submit message to general messages store
    submitMessage() {
      if (
        this.category === "general" &&
        this.content.trim().length
      ) {
        // Add message date and content
        const date =
          new Date().toUTCString();

        this.message.date = date;
        this.message.content =
          this.content;

        // Dispatch
        this.$store.dispatch(
          "updateMessages",
          this.message
        );

        //   Remove message
        this.content = "";

        this.message = {};

        console.log(this.messages);
      }
    },
    // Adjust hight of the comment box
    adjustHeight(e) {
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

      //   Submit message if enter is pressed and prevent line break unless shift is pressed too
      if (
        e.keyCode === 13 &&
        !e.shiftKey
      ) {
        e.preventDefault();

        // Submit message
        this.submitMessage();
      }
    },
  },
};
</script>
