<template>
    <div v-if="saved" class="success">Saved!</div>
    <div class="title">Settings</div>
    <div class="wrap">
        <div>
            <span>Set username:</span>
            <input
                type="text"
                v-model="userData.name"
                class="user-change"
                placeholder="Leave blank for current"
            />

            <span class="warning">{{ errorMessage }}</span>
        </div>
        <div>
            <span>Set text color:</span>
            <input type="color" class="color-pick" @change="changeColor" />
        </div>
        <div id="icons">
            <span>Select icon:</span>
            <div class="icon-collection">
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-1.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(1)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-2.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(2)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-3.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(3)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-4.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(4)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-5.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(5)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-6.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(6)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-7.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(7)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-8.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(8)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-9.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(9)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-10.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(10)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-11.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(11)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-12.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(12)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-13.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(13)" />
                </div>
                <div class="icon-group">
                    <img src="../../assets/chaticons/bot-14.png" alt />
                    <input type="radio" name="icon" @change="changeIcon(14)" />
                </div>
            </div>
        </div>
        <div class="submit">
            <button class="button-primary save-button" @click="setUserSettings">Save</button>
            <div v-if="!isAuth">
                <span>or</span>
                <router-link to="/signup" class="button-primary main-button signup-notice">Sign up</router-link>
                <span>to remember settings.</span>
            </div>
        </div>
    </div>
</template>

<script>
import fb from '../../firebase'

export default {
    data() {
        return {
            errorMessage: '',
            saved: false,
            userData: {
                name: '', color: '', icon: null
            }
        }
    },
    computed: {
        isAuth() {
            return this.$store.getters.isAuth
        },
        userId() {
            return this.$store.getters.userId
        },
        userFiltered() {
            const obj = {}

            // Loop user object and get valid values
            Object.keys(this.userData).forEach(key => {
                let item = this.userData[key]
                if (item) obj[key] = item
            })

            return obj
        }

    },
    methods: {
        changeColor(e) {
            this.userData.color = e.target.value
        },

        // Change current user settings
        setUserSettings() {
            // Check if username is valid
            if (this.userData.name.length > 0 && this.userData.name.length < 3) {
                this.errorMessage = "Username must be at least 3 characters!"

                setTimeout(() => {
                    this.errorMessage = ''
                }, 2000)

                return
            }

            // Update store user settings
            this.$store.dispatch("changeUserSettings", this.userData)

            // Update firebase
            if (this.isAuth) {
                // Get database
                const database = fb.ref(
                    fb.database,
                    "userList/" + this.userId
                );

                // Update local storage
                localStorage.setItem('userData', JSON.stringify(this.userData))

                // Update database
                fb.update(database, this.userFiltered);
            }

            this.saved = true

            setTimeout(() => {
                this.saved = false
            }, 2000)
        },
        changeIcon(num) {
            this.userData.icon = num;
        }
    },
}
</script>