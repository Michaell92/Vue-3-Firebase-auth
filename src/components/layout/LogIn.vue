<template>
    <form id="signup-form" @submit.prevent="logIn">
        <div id="form-wrap">
            <span class="lead">Login</span>
            <div id="warning" ref="warning"></div>
            <input type="email" v-model="signInName" placeholder="Email" />

            <input type="password" v-model="password" placeholder="Password" />

            <button type="submit" class="button-basic button-primary login">Log In</button>
            <span>or</span>

            <router-link to="/signup" class="button-primary main-button signup">Sign up</router-link>
        </div>
    </form>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import fb from "../../firebase"

export default {
    data() {
        return {
            signInName: '',
            password: '',
            valid: false
        }
    },
    computed: {
        userId() {
            this.$store.getters.userId
        }
    },
    methods: {
        logIn() {
            const auth = getAuth();
            console.log(this.signInName, this.password)
            signInWithEmailAndPassword(auth, this.signInName, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    this.$router.push('/')

                    // alert('Logged in as: ', user.email)
                    // ...
                })
                .catch((error) => {
                    // const errorCode = error.code;
                    // const errorMessage = error.message;

                    const warning = this.$refs.warning
                    warning.innerHTML = 'Wrong username or password!'
                    console.log(error)

                    setTimeout(() => {
                        warning.innerHTML = ''
                    }, 2000)
                });
        }
    }
}
</script>
