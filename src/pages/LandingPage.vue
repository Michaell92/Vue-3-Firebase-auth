<template>
  <!-- Login & signup buttons -->
  <div id="sign-up" v-if="!auth.currentUser">
    <router-link to="/login" class="button-secondary main-button">Login</router-link>
    <router-link to="/signup" class="button-primary main-button">Sign up</router-link>
  </div>
  <div id="sign-out" v-else>
    <button class="btn-basic button-primary" id="sign-out" @click="signOut">Sign Out</button>
  </div>
  <div id="landingPage">
    <!-- Navigation  -->
    <nav id="nav-left">
      <ul>
        <li>
          <router-link to="/chat">
            <span>General chat</span>
          </router-link>
        </li>
        <li>
          <router-link to="/messages">
            <span>Messages</span>
          </router-link>
        </li>
        <li>
          <router-link to="/settings">
            <span>Settings</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- Main section -->
    <main id="landingPage-main">
      <div id="chatBoxContainer">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";

export default {
  computed: {
    auth: () => getAuth(),

  },
  methods: {
    signOut() {
      signOut(this.auth).then(() => {
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    },
  }
};
</script>
