// Reviews & Visibility Manager
// Bridges real-time Firestore with local JSON files & Server APIs for rock-solid reliability

import { db, auth } from './firebase-config.js';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

function requireAdminAuth() {
    const user = auth?.currentUser;
    if (!user || user.isAnonymous) {
        throw new Error('Reikalinga administratoriaus autorizacija.');
    }
    return user;
}

// 1. Visibility (Rodymui / Nerodymui)
export async function getReviewsVisibility() {
    try {
        const res = await fetch('/api/reviews-visibility');
        if (res.ok) {
            const data = await res.json();
            return data.showReviews !== false;
        }
    } catch (e) {
        console.warn("Could not fetch /api/reviews-visibility:", e);
    }
    return true;
}

export async function setReviewsVisibility(showReviews) {
    requireAdminAuth();
    let savedToFile = false;
    try {
        const res = await fetch('/api/reviews-visibility', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ showReviews: Boolean(showReviews) })
        });
        if (res.ok) savedToFile = true;
    } catch (e) {
        console.warn("Error saving to /api/reviews-visibility:", e);
    }

    let dbError = null;
    try {
        await setDoc(doc(db, "settings", "reviews"), {
            visible: Boolean(showReviews),
            updatedAt: serverTimestamp()
        }, { merge: true });
    } catch (dbErr) {
        dbError = dbErr;
        console.error("Firestore settings update failed:", dbErr);
    }

    if (dbError && !savedToFile) {
        throw dbError;
    }

    return savedToFile || !dbError;
}

export function subscribeReviewsVisibility(callback) {
    getReviewsVisibility().then(callback);

    try {
        return onSnapshot(doc(db, "settings", "reviews"), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                callback(data.visible !== false);
            }
        }, (err) => {
            console.warn("Firestore visibility listener fallback:", err);
        });
    } catch (e) {
        console.warn("Firestore visibility subscribe error:", e);
    }
}

// 2. Reviews Data
export async function fetchReviewsList() {
    try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
            return await res.json();
        }
    } catch (e) {
        console.warn("Error fetching /api/reviews:", e);
    }
    return [];
}

export async function createNewReview(reviewData) {
    requireAdminAuth();
    let fileResult = null;
    try {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });
        if (res.ok) {
            const data = await res.json();
            fileResult = data.review;
        }
    } catch (e) {
        console.warn("Error saving review to server API:", e);
    }

    let dbError = null;
    let docRef = null;
    try {
        docRef = await addDoc(collection(db, "reviews"), {
            ...reviewData,
            visible: reviewData.visible !== false,
            createdAt: serverTimestamp()
        });
    } catch (dbErr) {
        dbError = dbErr;
        console.error("Firestore review add failed:", dbErr);
    }

    if (dbError && !fileResult) {
        throw dbError;
    }

    return fileResult || (docRef ? { id: docRef.id, ...reviewData } : null);
}

export async function toggleReviewItem(id, nextVisible) {
    requireAdminAuth();
    let apiOk = false;
    try {
        const res = await fetch(`/api/reviews/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: Boolean(nextVisible) })
        });
        if (res.ok) apiOk = true;
    } catch (e) {
        console.warn("API toggle error:", e);
    }

    let dbError = null;
    try {
        await updateDoc(doc(db, "reviews", id), { visible: Boolean(nextVisible) });
    } catch (dbErr) {
        dbError = dbErr;
        console.error("Firestore toggle error:", dbErr);
    }

    if (dbError && !apiOk) {
        throw dbError;
    }
}

export async function deleteReviewItem(id) {
    requireAdminAuth();
    let apiOk = false;
    try {
        const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
        if (res.ok) apiOk = true;
    } catch (e) {
        console.warn("API delete error:", e);
    }

    let dbError = null;
    try {
        await deleteDoc(doc(db, "reviews", id));
    } catch (dbErr) {
        dbError = dbErr;
        console.error("Firestore delete error:", dbErr);
    }

    if (dbError && !apiOk) {
        throw dbError;
    }
}
