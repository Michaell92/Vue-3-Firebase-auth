<template>
  <!-- Chatbox structure -->
  <div class="wrapper">
    <div id="messages">
      <user-message
        v-for="(message, index) in messages"
        :key="'message' + index"
        :content="message.content"
        :date="message.date"
        :userName="message.userName"
        :messageColor="message.color"
        :userIcon="message.icon"
      ></user-message>
    </div>
  </div>

  <!-- Submit message form -->
  <div id="commentBox">
    <form @submit.prevent="submitMessage">
      <textarea type="text" ref="commentBox" v-model="content" @keydown="adjustHeight" />
      <input type="submit" class="button-primary" id="submitButton" value="Send" />
    </form>
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
  computed: {
    randomName() {
      return "Anonymous" + Math.random().toFixed(3).slice(2);
    },
    newUserRandom() {
      return "Newuser" + Math.random().toFixed(3).slice(2);
    },
    getUserData() {
      return this.$store.getters.userData
    },
    isAuth() {
      return this.$store.getters.isAuth
    },
  },
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
        this.message.content =
          this.content;

        // Set username
        if (this.getUserData.name.length) {
          this.message.userName = this.getUserData.name
        } else {
          if (this.isAuth) {
            this.message.userName = this.newUserRandom
          } else {
            this.message.userName = this.randomName
          }

        }

        // Set message color
        if (this.getUserData.color.length) {
          this.message.color = this.getUserData.color
        }

        // Set user icon
        if (this.getUserData.icon) {
          this.message.icon = this.getUserData.icon
        }


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
    // Update firebase
    updateDB(date) {
      const database = fb.ref(
        fb.database,
        "chatMessages/" + date
      );

      fb.set(database, this.message);
    },
  },
};
</script>
