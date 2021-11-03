<template>
  <!-- Message structure -->
  <div id="message">
    <div id="name">Anonymous</div>
    <div id="content">
      {{ message }}
    </div>
    <div id="date">{{ date }}</div>
  </div>
</template>

<script>
export default {
  props: {
    //   Message prop
    message: {
      type: [String, Number],
      required: true,
    },
    date: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>
