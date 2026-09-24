// Reviews & Visibility Manager
// Bridges real-time Firestore with local JSON files & Server APIs for rock-solid reliability

import { db } from './firebase-config.js';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
    let savedToFile = false;
    try {
        const res = await fetch('/api/reviews-visibility', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ showReviews })
        });
        if (res.ok) savedToFile = true;
    } catch (e) {
        console.warn("Error saving to /api/reviews-visibility:", e);
    }

    try {
        await setDoc(doc(db, "settings", "reviews"), {
            visible: showReviews,
            updatedAt: serverTimestamp()
        }, { merge: true });
    } catch (dbErr) {
        console.warn("Firestore settings update skipped/failed:", dbErr);
    }

    return savedToFile;
}

export function subscribeReviewsVisibility(callback) {
    // Initial fetch from file
    getReviewsVisibility().then(callback);

    // Real-time Firestore sync listener
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

    try {
        await addDoc(collection(db, "reviews"), {
            ...reviewData,
            createdAt: serverTimestamp()
        });
    } catch (dbErr) {
        console.warn("Firestore review add skipped/failed:", dbErr);
    }

    return fileResult;
}

export async function toggleReviewItem(id, nextVisible) {
    try {
        await fetch(`/api/reviews/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ visible: nextVisible })
        });
    } catch (e) {
        console.warn("API toggle error:", e);
    }

    try {
        await updateDoc(doc(db, "reviews", id), { visible: nextVisible });
    } catch (dbErr) {
        console.warn("Firestore toggle error:", dbErr);
    }
}

export async function deleteReviewItem(id) {
    try {
        await fetch(`/api/reviews/${id}`, { method: 'DELETE' });
    } catch (e) {
        console.warn("API delete error:", e);
    }

    try {
        await deleteDoc(doc(db, "reviews", id));
    } catch (dbErr) {
        console.warn("Firestore delete error:", dbErr);
    }
}
