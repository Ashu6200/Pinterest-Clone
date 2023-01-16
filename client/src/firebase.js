import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBPRuaIIt9WZcF3k4Zp0RHnfeWrDelqWBo",
    authDomain: "myoratice.firebaseapp.com",
    projectId: "myoratice",
    storageBucket: "myoratice.appspot.com",
    messagingSenderId: "6020060612",
    appId: "1:6020060612:web:241704e12ffb574c42c091"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();