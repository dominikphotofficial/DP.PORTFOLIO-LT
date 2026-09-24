import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

export const firebaseConfig = {
    projectId: "tfp-form",
    appId: "1:542082314917:web:34889b7aa21c7eaed0d34c",
    apiKey: "AIzaSyBxhDy4I4HZnqOAvwWE3JyjYsuy_Tg86xE",
    authDomain: "tfp-form.firebaseapp.com",
    firestoreDatabaseId: "ai-studio-dpportfoliolt-0d398e5b-e665-43c2-8ab2-94507a3cbbce",
    storageBucket: "tfp-form.firebasestorage.app",
    messagingSenderId: "542082314917",
    measurementId: "",
    oAuthClientId: "542082314917-9d8eo0mal6muoob48g1mi494ce4gcupp.apps.googleusercontent.com"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
