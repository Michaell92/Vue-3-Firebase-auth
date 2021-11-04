<template>
  <!-- Message structure -->
  <div id="message">
    <!-- User -->
    <div id="info">
      <div id="user">
        <img
          src="../../assets/chat-icon.svg"
          alt="logo"
        />
        <span id="name">Anonymous</span>
      </div>
      <div id="date">{{ date }}</div>
    </div>

    <!-- Content -->
    <div id="content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //   Message prop
    content: {
      type: [String, Number],
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
};
</script>
