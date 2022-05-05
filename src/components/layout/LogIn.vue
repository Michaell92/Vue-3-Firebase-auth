<template>
    <form id="signup-form" @submit.prevent="logIn">
        <div id="form-wrap">
            <span class="lead">Login</span>
            <div id="warning" ref="warning"></div>
            <input type="email" v-model="signInName" placeholder="Email" required />

            <input type="password" v-model="password" placeholder="Password" required />

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

            signInWithEmailAndPassword(auth, this.signInName, this.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;


                    // Get user details
                    const userData = fb.ref(
                        fb.database,
                        "userList/" + user.uid
                    );

                    // Get user details
                    fb.get(userData, `userList/${user.uid}`).then((snapshot) => {
                        if (snapshot.exists()) {
                            const userData = snapshot.val()

                            // Update store if its logged in
                            this.$store.dispatch('changeUserSettings', userData)

                            // Update local storage
                            localStorage.setItem('userData', JSON.stringify(userData))
                        } else {
                            console.log("No data available");
                        }



                        this.$router.push('/')
                    }).catch((error) => {
                        console.error(error);
                    });
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
