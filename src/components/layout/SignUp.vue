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
import fb from '../../firebase'

export default {
    data() {
        return {
            signUpName: '',
            password: '',
            passwordRepeat: ''
        }
    },
    computed: {
        userData() {
            return this.$store.getters.userData
        }
    },
    methods: {
        // Validate form
        validate() {
            if (this.password !== this.passwordRepeat) {
                this.createWarning('Passwords do not match!')

                return
            }

            if (this.password.length < 6) {
                this.createWarning('Password needs to be at least 6 characters!')

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


                    // Get user details
                    const userData = fb.ref(
                        fb.database,
                        "userList/" + userId
                    );

                    // Save current settings
                    fb.set(userData, this.userData)


                    this.$router.push('/')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === 'auth/email-already-in-use') {
                        this.createWarning('Email already registered!')
                    }
                    // ...
                });
        },
        // Warning message
        createWarning(message) {
            const warning = this.$refs.warning
            warning.innerHTML = message

            setTimeout(() => {
                warning.innerHTML = ''
            }, 2000)
        }
    }
}

</script>