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

// 👤 Standard Google Auth Provider (Client-facing: ONLY profile and email, no Google Drive/Sheets scopes!)
export const googleProvider = new GoogleAuthProvider();

// 📗 Dedicated Google Sheets & Drive Provider (Used EXCLUSIVELY inside Admin Panel on demand)
export const googleSheetsProvider = new GoogleAuthProvider();
export const WORKSPACE_SCOPES = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/spreadsheets.readonly'
];
WORKSPACE_SCOPES.forEach(scope => {
    googleSheetsProvider.addScope(scope);
});

// 🩺 Diagnostic logging & strict custom domain verification
if (typeof window !== 'undefined') {
    window.firebaseAuthInstance = auth;
    window.__FIREBASE_INITIALIZED_CONFIG__ = {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        oAuthClientId: firebaseConfig.oAuthClientId,
        authHandler: `https://${firebaseConfig.authDomain}/__/auth/handler`,
        timestamp: new Date().toISOString()
    };
    if (firebaseConfig.authDomain !== 'dominikphotofficial.lt') {
        console.warn(`%c[Firebase Auth Warning] authDomain is currently '${firebaseConfig.authDomain}' instead of intended 'dominikphotofficial.lt'.`, 'color: #D32F2F; font-weight: bold;');
    } else {
        console.info('%c[Firebase Auth Config Injected Successfully: dominikphotofficial.lt]', 'color: #113939; font-weight: bold;', window.__FIREBASE_INITIALIZED_CONFIG__);
    }
}

export function getAuthActionSettings(continuePath = '/admin.html') {
    const isCustom = typeof window !== 'undefined' && 
        window.location.hostname && 
        window.location.hostname.includes('dominikphotofficial.lt');
    const origin = isCustom ? 'https://portfolio.dominikphotofficial.lt' : (typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://portfolio.dominikphotofficial.lt');
    return {
        url: `${origin}${continuePath}`,
        handleCodeInApp: true
    };
}

export const AUTH_ACTION_URL = 'https://dominikphotofficial.lt/__/auth/action';
