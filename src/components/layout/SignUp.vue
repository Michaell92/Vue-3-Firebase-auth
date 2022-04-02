<template>
    <form id="signup-form" @submit.prevent="validate">
        <div id="form-wrap">
            <span class="lead">Sign up</span>
            <div id="warning" ref="warning"></div>
            <input type="email" v-model="signUpName" placeholder="Email" required />

            <input type="password" v-model="password" placeholder="Password" required />
            <input type="password" v-model="passwordRepeat" placeholder="Repeat password" required />

            <button type="submit" class="button-basic button-primary signup">Sign Up</button>
            <span>or</span>
            <router-link to="/login" class="button-secondary main-button login">Log in</router-link>
        </div>
    </form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            signUpName: '',
            password: '',
            passwordRepeat: ''
        }
    },
    methods: {
        // Validate form
        validate() {
            const warning = this.$refs.warning
            if (this.password !== this.passwordRepeat) {
                warning.innerHTML = 'Passwords do not match!'

                setTimeout(() => {
                    warning.innerHTML = ''
                }, 2000)

                return
            }

            if (this.password.length < 6) {
                warning.innerHTML = 'Password needs to be at least 6 characters!'

                setTimeout(() => {
                    warning.innerHTML = ''
                }, 2000)

                return
            }

            this.signUp()
        },
        // Create user
        signUp() {
            const auth = getAuth()

            createUserWithEmailAndPassword(auth, this.signUpName, this.password)
                .then((userCredential) => {
                    // Signed in
                    const userId = userCredential.user.uid;

                    this.$router.push('/')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    // ...
                });
        }
    }
}

</script>