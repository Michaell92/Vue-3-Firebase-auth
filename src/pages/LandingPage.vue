<template>
  <div id="landingPage">
    <!-- Navigation  -->
    <nav id="nav-left">
      <ul>
        <li>
          <router-link to="/generalchat"
            >General chat</router-link
          >
        </li>
        <li>
          <router-link to="/generalchat"
            >Messages</router-link
          >
        </li>
        <li>
          <router-link to="/generalchat"
            >Preferences</router-link
          >
        </li>
      </ul>
    </nav>
    <!-- Main section -->
    <main id="landingPage-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {};
</script>
