import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

const isCustomDomain = typeof window !== 'undefined' && 
    window.location.hostname && 
    window.location.hostname.includes('dominikphotofficial.lt');

export const firebaseConfig = {
    projectId: "tfp-form",
    appId: "1:542082314917:web:34889b7aa21c7eaed0d34c",
    apiKey: "AIzaSyBxhDy4I4HZnqOAvwWE3JyjYsuy_Tg86xE",
    authDomain: "dominikphotofficial.lt",
    firestoreDatabaseId: "ai-studio-dpportfoliolt-0d398e5b-e665-43c2-8ab2-94507a3cbbce",
    storageBucket: "tfp-form.firebasestorage.app",
    messagingSenderId: "542082314917",
    measurementId: typeof window !== 'undefined' && window.GA4_MEASUREMENT_ID ? window.GA4_MEASUREMENT_ID : "G-XXXXXXXXXX",
    oAuthClientId: "542082314917-9d8eo0mal6muoob48g1mi494ce4gcupp.apps.googleusercontent.com"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
// Workspace scopes requested by user for Google Sheets & Drive
export const WORKSPACE_SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
];

WORKSPACE_SCOPES.forEach(scope => {
    googleProvider.addScope(scope);
});

export function getAuthActionSettings(continuePath = '/admin.html') {
    const isCustom = typeof window !== 'undefined' && 
        window.location.hostname && 
        window.location.hostname.includes('dominikphotofficial.lt');
    const origin = isCustom ? 'https://dominikphotofficial.lt' : (typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://dominikphotofficial.lt');
    return {
        url: `${origin}${continuePath}`,
        handleCodeInApp: true
    };
}

export const AUTH_ACTION_URL = 'https://dominikphotofficial.lt/__/auth/action';
