import {initializeApp } from "firebase/app";
import {getFirestore } from "@firebase/firestore"

const firebase_Config = {
    apiKey: "AIzaSyB4Yd4NClCsfwqUWF2sJ4CtO1D_eR4w14o",
    authDomain: "newarticle-fe70f.firebaseapp.com",
    projectId: "newarticle-fe70f",
    storageBucket: "newarticle-fe70f.appspot.com",
    messagingSenderId: "77397658742",
    appId: "1:77397658742:web:2507e9409635fd7bb12357"
  };

  const Other_app =initializeApp(firebase_Config, 'other');
export const db = getFirestore(Other_app);