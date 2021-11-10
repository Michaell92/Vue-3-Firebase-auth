<template>
  <!-- Chatbox structure -->
  <div id="chatBoxContainer">
    <div id="wrapper" ref="wrapper">
      <div id="messages" ref="messages">
        <user-message
          v-for="message in messages"
          :key="message.date"
          :content="message.content"
          :date="message.date"
          :userName="message.userName"
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
// Get firebase data
import fb from "../../firebase.js";

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

        const d = new Date();

        // Format date
        const date =
          d.getHours() +
          ":" +
          d.getMinutes() +
          ", " +
          d.toDateString();

        this.message.date = date;

        // Add content to message object
        this.message.content =
          this.content;

        // Update database
        this.updateDB(d.getTime());

        //   Reset message and content
        this.content = "";

        this.message = {};
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
    // Date formatter
    getDate() {
      const date = new Date();
      const formatted =
        date.getMonth() +
        ", " +
        date.getDay() +
        ", " +
        date.getFullYear();

      return formatted;
    },
    // Scroll to bottom of the chat after new message
    scrollToBottom() {
      // Get element
      const messages =
        this.$refs.messages;

      // Scroll to bottom
      messages.scrollTo(
        0,
        messages.scrollHeight
      );
    },
    // Update firebase
    async updateDB(date) {
      await this.$store.dispatch(
        "updateMessages",
        this.message
      );

      this.scrollToBottom();

      //   // Get path
      //   const database = fb.ref(
      //     fb.database,
      //     "chatMessages/" +
      //       this.getDate() +
      //       "/" +
      //       date
      //   );

      //   // Update
      //   fb.set(database, this.message);
    },
  },
};
</script>
