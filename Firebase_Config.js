import {initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyAutVVq9B8hApdtPxvEYuAM6EGahc9NIGI",
    authDomain: "quesfirebase.firebaseapp.com",
    projectId: "quesfirebase",
    storageBucket: "quesfirebase.appspot.com",
    messagingSenderId: "954434862101",
    appId: "1:954434862101:web:9d47e5eccabe2a6e27621c",
    measurementId: "G-MVQQVZ3LCK"
};

const app =initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage= getStorage(app);
export const auth = getAuth(app);
