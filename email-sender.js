// Client-side email dispatcher
// Bridges direct Node.js SMTP email sending with Firestore mail logging

import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

export async function sendEmail({ to, subject, html, clientName, replyTo }) {
    let serverResult = null;
    let serverDelivered = false;

    // 1. Direct Server SMTP dispatch (reaches client inbox!)
    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ to, subject, html, clientName, replyTo })
        });
        const text = await response.text();
        try {
            serverResult = JSON.parse(text);
        } catch (_) {
            serverResult = { success: response.ok, raw: text };
        }
        serverDelivered = Boolean(serverResult && serverResult.delivered);
    } catch (apiErr) {
        console.warn("Server email API request error:", apiErr);
    }

    // 2. Also write to Firestore "mail" collection
    try {
        await addDoc(collection(db, "mail"), {
            to: to.trim(),
            message: { subject: subject.trim(), html },
            clientName: clientName || '',
            delivered: serverDelivered,
            createdAt: serverTimestamp()
        });
    } catch (fsErr) {
        console.warn("Firestore mail backup skipped/failed:", fsErr);
    }

    return {
        success: Boolean(serverResult && (serverResult.success || serverResult.delivered)),
        delivered: serverDelivered,
        queued: Boolean(serverResult && serverResult.queued),
        notice: serverResult ? serverResult.notice : null,
        error: serverResult ? serverResult.error : null
    };
}
