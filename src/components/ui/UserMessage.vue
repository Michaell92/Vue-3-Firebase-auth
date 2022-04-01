<template>
  <!-- Message structure -->
  <div id="message">
    <!-- User -->
    <div id="info">
      <div id="user">
        <img :src="icon" alt="logo" />
        <span id="name">
          {{
            userName
          }}
        </span>
      </div>
      <div id="date">{{ date }}</div>
    </div>

    <!-- Content -->
    <div id="content" :style="userColor">{{ content }}</div>
  </div>
</template>

<script>
export default {
  props: {
    //   Message prop
    userName: {
      type: String,
      required: false,
    },
    content: {
      type: [String, Number],
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    messageColor: {
      type: String,
      required: false,
    },
    userIcon: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      icon: ''
    }

  },
  computed: {
    userColor() {
      return 'color: ' + this.messageColor
    },
  },
  mounted() {
    if (this.userIcon) {
      import('../../assets/chaticons/bot-' + this.userIcon + '.png').then((image) => {
        this.icon = image.default
      })
    } else {
      import("../../assets/chat-icon.svg").then((image) => {
        this.icon = image.default
      })
    }
  }
};
</script>
