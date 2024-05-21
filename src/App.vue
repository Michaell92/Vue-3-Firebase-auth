<template>
    <the-header></the-header>
    <router-view />
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import LandingPage from './pages/LandingPage.vue';

// Firebase data
import fb from './firebase.js';

export default {
    components: {
        TheHeader,
        LandingPage,
    },
    data() {
        return {
            active: false,
        };
    },
    computed: {
        // Get general messages from store
        userMessages() {
            return this.$store.getters.messages;
        },
    },
    mounted() {
        // FIREBASE METHODS
        const order = fb.orderByKey;
        const limitFirst = fb.limitToFirst;
        const limitLast = fb.limitToLast;

        // Get data from local storage if any
        const userData = localStorage.getItem('userData');

        if (userData) {
            // Update store user settings
            this.$store.dispatch('changeUserSettings', JSON.parse(userData));
        }

        // Data path
        const data = fb.ref(fb.database, 'chatMessages');

        // DATA
        const getData = (num) => fb.query(data, order(), limitLast(num));

        if (this.userMessages.length === 0) {
            fb.get(getData(15))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const messages = snapshot.val();

                        // Check if messages are already there
                        this.$store.dispatch('updateMessages', messages);
                    } else {
                        // console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        // Add listener for messages on database
        fb.onValue(getData(1), (snapshot) => {
            const messages = snapshot.val();

            if (this.active) {
                this.$store.dispatch('updateMessages', messages);
            }
            this.active = true;
        });

        fetch('./.netlify/functions/logUsers')
            .then((response) => response.json())
            .then((data) => {
                const formattedDate = new Date().toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                });

                const payload = { IP: data.ip, date: formattedDate };
                const dbRef = fb.ref(fb.database, 'userLogs');
                const newRecordRef = fb.push(dbRef);

                fb.set(newRecordRef, payload);
            });
    },
};
</script>

<style lang="scss">
@import './scss/style';
</style>
