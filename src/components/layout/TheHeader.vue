<template>
  <div id="top-nav">
    <!-- Top navigation -->
    <nav id="nav-main">
      <router-link
        to="/"
        id="home-page"
      >
        <div>
          <h2>X-COM</h2>
          <img
            src="../../assets/icon.svg"
            alt="logo"
          />
        </div>
      </router-link>
      <a
        href="https://github.com/michaell92/x-com"
        target="_blank"
        id="git"
        ><h3>GitHub</h3>
      </a>
    </nav>
    <!-- Login & signup buttons -->
    <div id="sign-up">
      <router-link
        to="/"
        class="button-secondary"
        >Login</router-link
      >
      <router-link
        to="/"
        class="button-primary"
        >Sign up</router-link
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>
