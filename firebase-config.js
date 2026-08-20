import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBxhDy4I4HZnqOAvwWE3JyjYsuy_Tg86xE",
  authDomain: "tfp-form.firebaseapp.com",
  projectId: "tfp-form",
  storageBucket: "tfp-form.firebasestorage.app",
  messagingSenderId: "542082314917",
  appId: "1:542082314917:web:5d3a750950a8ac4fd0d34c",
  measurementId: "G-4VRZRBDHY2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
