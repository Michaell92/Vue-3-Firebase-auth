<template>
  <!-- Login & signup buttons -->
  <div id="sign-up" v-if="!isAuth">
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
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import fb from '../firebase'

export default {
  computed: {
    auth: () => getAuth(),
    isAuth() {
      return this.$store.getters.userId
    }
  },
  methods: {
    signOut() {
      signOut(this.auth).then(() => {
        // this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  mounted() {
    // Update state of current user in store and current component
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // Change auth status
        this.$store.dispatch('changeUserAuthAndId', { isAuth: true, id: user.uid })

        // Get user details
        const userData = fb.ref(
          fb.database,
          "userList/" + user.uid
        );

        // Get user details
        fb.get(userData, `userList/${user.uid}`).then((snapshot) => {
          console.log(user.uid)
          if (snapshot.exists()) {
            const userData = snapshot.val()
            // Update store if its logged in userData
            this.$store.dispatch('changeUserSettings', { name: userData.name, color: userData.color, icon: userData.icon })

            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });



      } else {
        this.$store.dispatch('resetUser')
      }
    })
  }
};
</script>
