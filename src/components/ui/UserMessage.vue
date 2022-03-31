<template>
  <!-- Message structure -->
  <div id="message">
    <!-- User -->
    <div id="info">
      <div id="user">
        <img src="../../assets/chat-icon.svg" alt="logo" />
        <span id="name">
          {{
            userName
          }}
        </span>
      </div>
      <div id="date">{{ date }}</div>
    </div>

    <!-- Content -->
    <div id="content">{{ content }}</div>
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
  },
};
</script>
