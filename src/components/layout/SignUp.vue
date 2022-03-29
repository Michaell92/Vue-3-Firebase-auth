<template>
    <form id="signup-form" @submit.prevent="validate">
        <div id="form-wrap">
            <div id="warning" ref="warning"></div>
            <input type="email" v-model="signUpName" placeholder="Email" required />

            <input type="password" v-model="password" placeholder="Password" required />
            <input type="password" v-model="passwordRepeat" placeholder="Repeat password" required />

            <button type="submit" class="button-basic button-primary">Sign Up</button>
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
        signUp() {
            const auth = getAuth()

            createUserWithEmailAndPassword(auth, this.signUpName, this.password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    alert('Created account for: ', user)
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