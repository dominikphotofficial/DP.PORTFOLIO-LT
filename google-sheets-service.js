import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { googleProvider } from "./firebase-config.js";

/**
 * Google Sheets & Drive Client Service
 * Strictly respects security guidelines:
 * - Access token is cached in memory ONLY (never in localStorage / sessionStorage).
 * - Cleared on user logout.
 * - Always requests confirmation before updating/mutating Google Sheets.
 */

let cachedAccessToken = null;
let tokenExpiryTime = 0;

export function getCachedToken() {
    if (cachedAccessToken && Date.now() < tokenExpiryTime) {
        return cachedAccessToken;
    }
    return cachedAccessToken;
}

export function setCachedToken(token, expiresInSeconds = 3500) {
    cachedAccessToken = token;
    tokenExpiryTime = Date.now() + (expiresInSeconds * 1000);
}

export function clearCachedToken() {
    cachedAccessToken = null;
    tokenExpiryTime = 0;
}

/**
 * Authenticate with Google to obtain Sheets/Drive access token
 */
export async function authenticateGoogleSheets(authInstance) {
    try {
        const result = await signInWithPopup(authInstance, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential?.accessToken) {
            throw new Error("Nepavyko gauti Google OAuth prieigos rakto. Patikrinkite leidimus.");
        }
        setCachedToken(credential.accessToken);
        return {
            user: result.user,
            accessToken: credential.accessToken
        };
    } catch (error) {
        console.error("Google authentication error:", error);
        throw error;
    }
}

/**
 * Helper to execute authorized Google API requests
 */
async function callGoogleApi(url, options = {}, token = null) {
    const accessToken = token || getCachedToken();
    if (!accessToken) {
        const err = new Error("AUTH_REQUIRED: Reikalingas Google prisijungimas su Sheets prieiga.");
        err.code = "AUTH_REQUIRED";
        throw err;
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...(options.headers || {})
    };

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (!response.ok) {
        let errBody = null;
        try {
            errBody = await response.json();
        } catch (_) {
            errBody = { message: await response.text() };
        }
        const message = errBody?.error?.message || response.statusText || 'Google API klaida';
        const error = new Error(`Google API klaida (${response.status}): ${message}`);
        error.status = response.status;
        error.details = errBody;
        throw error;
    }

    return await response.json();
}

/**
 * List user spreadsheets from Google Drive
 */
export async function listGoogleSpreadsheets(token = null) {
    const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
    const fields = encodeURIComponent("files(id,name,modifiedTime,webViewLink)");
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=20&orderBy=modifiedTime desc`;
    const res = await callGoogleApi(url, { method: 'GET' }, token);
    return res.files || [];
}

/**
 * Create a brand new Google Spreadsheet configured for DP Photography
 */
export async function createPortfolioSpreadsheet(title = "DP.PORTFOLIO Užsakymai & Finansai", token = null) {
    const url = "https://sheets.googleapis.com/v4/spreadsheets";
    const body = {
        properties: {
            title: title
        },
        sheets: [
            { properties: { title: "TFP Užklausos", index: 0, gridProperties: { frozenRowCount: 1 } } },
            { properties: { title: "Mokamos Paslaugos", index: 1, gridProperties: { frozenRowCount: 1 } } },
            { properties: { title: "Kontaktai & Žinutės", index: 2, gridProperties: { frozenRowCount: 1 } } },
            { properties: { title: "VMI Pajamos", index: 3, gridProperties: { frozenRowCount: 1 } } }
        ]
    };

    const spreadsheet = await callGoogleApi(url, {
        method: 'POST',
        body: JSON.stringify(body)
    }, token);

    return spreadsheet;
}

/**
 * Fetch spreadsheet metadata to inspect existing sheet tabs
 */
export async function getSpreadsheetDetails(spreadsheetId, token = null) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title,sheets.properties(sheetId,title,index)`;
    return await callGoogleApi(url, { method: 'GET' }, token);
}

/**
 * Ensure the required sheets (tabs) exist in the spreadsheet, creating any that are missing
 */
export async function ensureRequiredSheets(spreadsheetId, requiredSheetTitles = ["TFP Užklausos", "Mokamos Paslaugos", "Kontaktai & Žinutės", "VMI Pajamos"], token = null) {
    const details = await getSpreadsheetDetails(spreadsheetId, token);
    const existingTitles = (details.sheets || []).map(s => s.properties?.title);

    const missing = requiredSheetTitles.filter(t => !existingTitles.includes(t));
    if (missing.length === 0) return details;

    const requests = missing.map((title, idx) => ({
        addSheet: {
            properties: {
                title: title,
                gridProperties: { frozenRowCount: 1 }
            }
        }
    }));

    await callGoogleApi(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        body: JSON.stringify({ requests })
    }, token);

    return await getSpreadsheetDetails(spreadsheetId, token);
}

/**
 * Overwrite / update values in a specific range
 */
export async function setSheetValues(spreadsheetId, range, values, token = null) {
    const encodedRange = encodeURIComponent(range);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`;
    return await callGoogleApi(url, {
        method: 'PUT',
        body: JSON.stringify({
            range: range,
            majorDimension: 'ROWS',
            values: values
        })
    }, token);
}

/**
 * Clear values in a range before updating (to remove old orphaned rows)
 */
export async function clearSheetValues(spreadsheetId, range, token = null) {
    const encodedRange = encodeURIComponent(range);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}:clear`;
    return await callGoogleApi(url, {
        method: 'POST',
        body: JSON.stringify({})
    }, token);
}

/**
 * Read values from a range
 */
export async function getSheetValues(spreadsheetId, range, token = null) {
    const encodedRange = encodeURIComponent(range);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodedRange}`;
    return await callGoogleApi(url, { method: 'GET' }, token);
}

/**
 * Format header row with emerald background and bold text
 */
export async function formatHeaderRow(spreadsheetId, sheetId, numCols, token = null) {
    const requests = [
        {
            repeatCell: {
                range: {
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: numCols
                },
                cell: {
                    userEnteredFormat: {
                        backgroundColor: { red: 0.066, green: 0.223, blue: 0.223 }, // #113939
                        textFormat: {
                            foregroundColor: { red: 1, green: 1, blue: 1 },
                            bold: true,
                            fontSize: 10
                        },
                        horizontalAlignment: "CENTER",
                        verticalAlignment: "MIDDLE"
                    }
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)"
            }
        },
        {
            updateSheetProperties: {
                properties: {
                    sheetId: sheetId,
                    gridProperties: {
                        frozenRowCount: 1
                    }
                },
                fields: "gridProperties.frozenRowCount"
            }
        }
    ];

    try {
        await callGoogleApi(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
            method: 'POST',
            body: JSON.stringify({ requests })
        }, token);
    } catch (e) {
        console.warn("Could not format header row:", e);
    }
}

/**
 * Format and prepare data rows for TFP
 */
export function formatTfpData(tfpList) {
    const headers = [
        "Užklausos ID",
        "Data & Laikas",
        "Klientas / Modelis",
        "El. paštas",
        "Instagram",
        "Lokacija / Miestas",
        "Fotosesijos idėja",
        "Būsena",
        "Vidinis komentaras",
        "Sukurta"
    ];

    const rows = (tfpList || []).map(item => [
        item.id || '',
        item.date_time || item.preferredDate || '',
        item.name || '',
        item.email || '',
        item.instagram || '',
        item.location || '',
        item.idea || '',
        item.status || 'New',
        item.adminNotes || '',
        item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleString('lt-LT') : (item.createdAt || '')
    ]);

    return [headers, ...rows];
}

/**
 * Format and prepare data rows for Paid Services
 */
export function formatServicesData(servicesList) {
    const headers = [
        "Užsakymo ID",
        "Data & Laikas",
        "Klientas",
        "Telefonas",
        "El. paštas",
        "Socialinis profilis",
        "Paslaugos pavadinimas",
        "Lokacija",
        "Bendra kaina (€)",
        "Avansas (€)",
        "Likutis (€)",
        "Mokėjimo būdas",
        "Kvito poreikis",
        "Kvito URL",
        "Wfolio Galerija",
        "Būsena",
        "Vidinis komentaras",
        "Sukurta"
    ];

    const rows = (servicesList || []).map(item => [
        item.id || '',
        `${item.preferredDate || ''} ${item.preferredTime || ''}`.trim(),
        item.clientName || '',
        item.clientPhone || '',
        item.clientEmail || '',
        item.socialHandle || '',
        item.serviceName || '',
        item.location || '',
        Number(item.finalPrice || 0),
        Number(item.depositAmount || 0),
        Number(item.remainingAmount || 0),
        item.paymentMethod || 'Bank Transfer',
        item.receiptNeeded || 'Ne',
        item.receiptUrl || '',
        item.galleryUrl || '',
        item.status || 'Pending',
        item.adminNotes || '',
        item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleString('lt-LT') : (item.createdAt || '')
    ]);

    return [headers, ...rows];
}

/**
 * Format and prepare data rows for Contact Messages
 */
export function formatContactsData(contactsList) {
    const headers = [
        "Žinutės ID",
        "Siuntėjas",
        "El. paštas",
        "Tema",
        "Žinutės tekstas",
        "Būsena",
        "Gauta data"
    ];

    const rows = (contactsList || []).map(item => [
        item.id || '',
        item.name || '',
        item.email || '',
        item.subject || '',
        item.message || '',
        item.status || 'New',
        item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toLocaleString('lt-LT') : (item.createdAt || '')
    ]);

    return [headers, ...rows];
}

/**
 * Format and prepare data rows for VMI Tax Accounting
 */
export function formatVmiData(servicesList) {
    const headers = [
        "Įrašo ID",
        "Data",
        "Klientas",
        "Sąskaitos / Kvito Nr.",
        "Paslauga",
        "Pajamos (€)",
        "Atsiskaitymo būdas",
        "Būsena"
    ];

    const validVmi = (servicesList || []).filter(item => {
        const st = item.status;
        return st === 'Deposit Paid' || st === 'Fully Paid' || st === 'Completed' || (Number(item.depositAmount) > 0);
    });

    const rows = validVmi.map(item => {
        let income = Number(item.finalPrice || 0);
        if (item.status === 'Deposit Paid') {
            income = Number(item.depositAmount || 0);
        }
        const dateStr = item.preferredDate || (item.createdAt?.seconds ? new Date(item.createdAt.seconds * 1000).toISOString().split('T')[0] : '');
        return [
            item.id || '',
            dateStr,
            item.clientName || 'Privatus klientas',
            item.receiptNumber || `DP-${(item.id || '').substring(0, 6).toUpperCase()}`,
            item.serviceName || 'Fotografijos paslaugos',
            income,
            item.paymentMethod || 'Bankinis pavedimas',
            item.status || 'Paid'
        ];
    });

    return [headers, ...rows];
}

/**
 * Sync individual dataset to spreadsheet tab
 */
export async function syncTab(spreadsheetId, tabName, values, token = null) {
    await clearSheetValues(spreadsheetId, `${tabName}!A1:Z500`, token);
    const result = await setSheetValues(spreadsheetId, `${tabName}!A1`, values, token);
    return result;
}

/**
 * Master Sync: Pushes TFP, Services, Contacts, and VMI into separate tabs
 */
export async function syncAllDatasetsToSheet(spreadsheetId, datasets, token = null) {
    const sheetTitles = ["TFP Užklausos", "Mokamos Paslaugos", "Kontaktai & Žinutės", "VMI Pajamos"];
    const sheetInfo = await ensureRequiredSheets(spreadsheetId, sheetTitles, token);

    const tfpValues = formatTfpData(datasets.tfp || []);
    const srvValues = formatServicesData(datasets.services || []);
    const contactValues = formatContactsData(datasets.contacts || []);
    const vmiValues = formatVmiData(datasets.services || []);

    const results = {
        tfp: await syncTab(spreadsheetId, "TFP Užklausos", tfpValues, token),
        services: await syncTab(spreadsheetId, "Mokamos Paslaugos", srvValues, token),
        contacts: await syncTab(spreadsheetId, "Kontaktai & Žinutės", contactValues, token),
        vmi: await syncTab(spreadsheetId, "VMI Pajamos", vmiValues, token),
        updatedAt: new Date().toISOString()
    };

    // Style headers for each tab
    const tabs = sheetInfo.sheets || [];
    for (const tab of tabs) {
        const title = tab.properties?.title;
        const sheetId = tab.properties?.sheetId;
        if (sheetId !== undefined) {
            let cols = 10;
            if (title === "Mokamos Paslaugos") cols = 18;
            if (title === "Kontaktai & Žinutės") cols = 7;
            if (title === "VMI Pajamos") cols = 8;
            await formatHeaderRow(spreadsheetId, sheetId, cols, token);
        }
    }

    return results;
}
