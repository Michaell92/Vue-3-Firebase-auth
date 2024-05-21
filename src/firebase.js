// Firebase data
import { initializeApp } from 'firebase/app';

import {
    getDatabase,
    ref,
    set,
    push,
    update,
    onValue,
    child,
    get,
    orderByKey,
    limitToFirst,
    limitToLast,
    query,
} from 'firebase/database';

import { getAuth } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
    apiKey: 'AIzaSyCAnkAdwUmL_qGZpSLBlNLp9nNagu_lCaI',
    authDomain: 'x-com-a4aec.firebaseapp.com',
    databaseURL: 'https://x-com-a4aec-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'x-com-a4aec',
    storageBucket: 'x-com-a4aec.appspot.com',
    messagingSenderId: '312398006709',
    appId: '1:312398006709:web:d19a751cf8fa5e66d131fc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get database
const database = getDatabase(app);

// Auth config
const auth = getAuth(app);

export default {
    ref,
    set,
    push,
    update,
    onValue,
    child,
    get,
    orderByKey,
    limitToFirst,
    limitToLast,
    query,
    database,
};
