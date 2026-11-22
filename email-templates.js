// ==============================================================================
// DP.PORTFOLIO - El. pašto šablonai (HTML + Plain Text)
// DP.PORTFOLIO • Fotografija & Vaizdo įrašai • Kaunas, Lietuva
// ==============================================================================

const BRAND = {
    name: "DP.PORTFOLIO",
    author: "DP.PORTFOLIO",
    logoUrl: "https://iili.io/fjNLbs4.png",
    websiteUrl: "https://portfolio.dominikphotofficial.lt",
    instagramUrl: "https://instagram.com/dominikphotofficial",
    instagramHandle: "@dominikphotofficial",
    email: "info@dominikphotofficial.lt",
    supportEmail: "info@dominikphotofficial.lt",
    colors: {
        darkGreen: "#113939",
        accentLight: "#2A5C5C",
        accentGold: "#113939",
        bgCream: "#F7F6F2",
        cardBg: "#FFFFFF",
        textDark: "#1A2B2B",
        textMuted: "#607272",
        borderLight: "#E8ECEB"
    }
};

export function escapeEmailHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[ch]));
}

export function htmlToPlainText(html) {
    return String(html ?? '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(p|div|tr|li|h1|h2|h3|h4|ol|ul|table)>/gi, '\n')
        .replace(/<(td|th)[^>]*>/gi, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&middot;/gi, '·')
        .replace(/&bull;/gi, '•')
        .replace(/&rarr;/gi, '->')
        .replace(/&darr;/gi, '↓')
        .replace(/&ndash;|&mdash;/gi, '-')
        .replace(/&euro;/gi, 'EUR')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#39;/gi, "'")
        .replace(/[ \t]+\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

const emailWrapperStart = `
<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DP.PORTFOLIO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all; font-size: 1px; line-height: 1px; color: #F4F6F5;">
        DP.PORTFOLIO • Pranešimas apie jūsų užsakymą arba užklausą.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F6F5; padding: 40px 15px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 35px rgba(17,57,57,0.08); border: 1px solid #E8ECEB;">
                    <tr>
                        <td align="center" style="background-color: #113939; padding: 32px 25px; text-align: center;">
                            <a href="${BRAND.websiteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                                <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="58" height="58" style="display: block; margin: 0 auto 12px auto; border: 0; outline: none;">
                                <div style="font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 18px; letter-spacing: 4px; text-transform: uppercase; color: #FFFFFF; font-weight: 500; line-height: 1.2;">${BRAND.name}</div>
                                <div style="font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #A2BFBD; margin-top: 5px;">Fotografija &amp; Vaizdo įrašai</div>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="height: 3px; background: #113939;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 36px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
`;

const emailWrapperEnd = `
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color: #FAFBFB; border-top: 1px solid #E8ECEB; padding: 26px 30px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
                            <p style="margin: 0 0 8px 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 600;">
                                DP.PORTFOLIO
                            </p>
                            <p style="margin: 0 0 14px 0; font-size: 13px; color: #607272; line-height: 1.6;">
                                Fotografija &amp; Vaizdo įrašai &bull; Kaunas, Lietuva<br>
                                <a href="${BRAND.websiteUrl}" target="_blank" style="color: #113939; text-decoration: underline; font-weight: 600;">portfolio.dominikphotofficial.lt</a> &bull;
                                <a href="${BRAND.instagramUrl}" target="_blank" style="color: #113939; text-decoration: underline; font-weight: 600;">${BRAND.instagramHandle}</a>
                            </p>
                            <p style="margin: 0; font-size: 11px; color: #9AA7A7; line-height: 1.4;">
                                &copy; 2026 DP.PORTFOLIO. Visos teisės saugomos.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

/**
 * Generates payment block HTML and Plain Text.
 * Sensitive bank/IBAN data is NEVER hardcoded in public JS.
 * Pass `paymentDetails = { recipient, iban, bank, paypal }` only from server env or authenticated Admin billing settings.
 */
export function getPaymentDetailsContent(method, depositAmount, clientName, paymentDetails = null, lang = 'lt') {
    const formattedDeposit = Number(depositAmount || 0).toFixed(2);
    const safeClient = escapeEmailHtml(clientName || 'Fotosesija');
    const rawClient = String(clientName || 'Fotosesija');
    const details = paymentDetails || {};
    const recipient = details.recipient ? String(details.recipient).trim() : '';
    const iban = details.iban ? String(details.iban).trim() : '';
    const bank = details.bank ? String(details.bank).trim() : '';
    const paypal = details.paypal ? String(details.paypal).trim() : '';

    if (method === 'PayPal') {
        if (!paypal) {
            const noteText = lang === 'en'
                ? `Payment details (PayPal) for the 50% deposit (${formattedDeposit} EUR) will be sent in a separate confirmation message once your date is finalized.`
                : lang === 'ru'
                ? `Реквизиты для оплаты аванса 50% (${formattedDeposit} EUR) через PayPal будут отправлены вам после подтверждения даты и времени.`
                : `PayPal apmokėjimo rekvizitus 50% avansui (${formattedDeposit} EUR) atsiųsime atskiru pranešimu, kai suderinsime ir patvirtinsime jūsų pasirinktą datą.`;
            const html = `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FAFBFB; border: 1px solid #D9E2E2; border-left: 4px solid #113939; border-radius: 4px;">
                    <tr>
                        <td style="padding: 20px 22px; font-size: 14px; color: #1A2B2B; line-height: 1.6;">
                            <strong style="display: block; color: #113939; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 6px;">Apmokėjimo informacija (PayPal)</strong>
                            ${escapeEmailHtml(noteText)}
                        </td>
                    </tr>
                </table>
            `;
            return { html, text: `Apmokėjimo informacija (PayPal):\n${noteText}` };
        }

        const html = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FFFFFF; border: 1px solid #003087; border-left: 4px solid #003087; border-radius: 4px;">
                <tr>
                    <td style="padding: 22px 24px;">
                        <div style="font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #003087; font-weight: 700; margin-bottom: 12px;">
                            PayPal apmokėjimo rekvizitai
                        </div>
                        <table role="presentation" width="100%" cellpadding="5" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                            <tr>
                                <td style="width: 150px; color: #607272; font-size: 13px;">Gavėjo PayPal:</td>
                                <td><span style="background-color: #EDF2F7; padding: 4px 9px; border-radius: 3px; font-family: monospace; font-size: 14px; font-weight: bold; color: #003087;">${escapeEmailHtml(paypal)}</span></td>
                            </tr>
                            ${recipient ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">Gavėjas:</td>
                                <td><b>${escapeEmailHtml(recipient)}</b></td>
                            </tr>` : ''}
                            <tr>
                                <td style="color: #607272; font-size: 13px;">Mokėtinas avansas (50%):</td>
                                <td><b style="color: #003087; font-size: 16px;">${formattedDeposit} &euro;</b></td>
                            </tr>
                            <tr>
                                <td style="color: #607272; font-size: 13px;">Mokėjimo paskirtis:</td>
                                <td><em>Avansas už fotosesiją (${safeClient})</em></td>
                            </tr>
                        </table>
                        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #EDF2F7; font-size: 12px; color: #607272; line-height: 1.5;">
                            Pervedę nurodykite savo vardą mokėjimo pastaboje ir atsakykite į šį laišką patvirtinimui.
                        </div>
                    </td>
                </tr>
            </table>
        `;
        const text = [
            `PayPal apmokėjimo rekvizitai:`,
            `- Gavėjo PayPal: ${paypal}`,
            recipient ? `- Gavėjas: ${recipient}` : null,
            `- Mokėtinas avansas (50%): ${formattedDeposit} EUR`,
            `- Mokėjimo paskirtis: Avansas už fotosesiją (${rawClient})`,
            `Pervedę atsakykite į šį laišką patvirtinimui.`
        ].filter(Boolean).join('\n');
        return { html, text };
    }

    if (!iban) {
        const noteText = lang === 'en'
            ? `Bank transfer details for the 50% deposit (${formattedDeposit} EUR) will be sent privately once your session date and time are confirmed.`
            : lang === 'ru'
            ? `Банковские реквизиты для оплаты 50% аванса (${formattedDeposit} EUR) будут отправлены в ответном письме после подтверждения даты и времени.`
            : `Bankinio pavedimo rekvizitus 50% avansui (${formattedDeposit} EUR) atsiųsime privačiai el. paštu, kai tik patvirtinsime jūsų pasirinktą fotosesijos datą ir laiką.`;
        const html = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FAFBFB; border: 1px solid #D9E2E2; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 20px 22px; font-size: 14px; color: #1A2B2B; line-height: 1.6;">
                        <strong style="display: block; color: #113939; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 6px;">Apmokėjimo informacija</strong>
                        ${escapeEmailHtml(noteText)}
                    </td>
                </tr>
            </table>
        `;
        return { html, text: `Apmokėjimo informacija:\n${noteText}` };
    }

    const html = `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FFFFFF; border: 1px solid #113939; border-left: 4px solid #113939; border-radius: 4px;">
            <tr>
                <td style="padding: 22px 24px;">
                    <div style="font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 12px;">
                        Bankinio pavedimo rekvizitai
                    </div>
                    <table role="presentation" width="100%" cellpadding="5" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                        ${recipient ? `
                        <tr>
                            <td style="width: 150px; color: #607272; font-size: 13px;">Gavėjas:</td>
                            <td><b>${escapeEmailHtml(recipient)}</b></td>
                        </tr>` : ''}
                        <tr>
                            <td style="width: 150px; color: #607272; font-size: 13px;">IBAN sąskaita:</td>
                            <td>
                                <span style="background-color: #F0F5F4; border: 1px solid #D5E2E0; padding: 4px 9px; border-radius: 3px; font-family: monospace; font-size: 15px; font-weight: bold; color: #113939;">${escapeEmailHtml(iban)}</span>
                            </td>
                        </tr>
                        ${bank ? `
                        <tr>
                            <td style="color: #607272; font-size: 13px;">Bankas:</td>
                            <td>${escapeEmailHtml(bank)}</td>
                        </tr>` : ''}
                        <tr>
                            <td style="color: #607272; font-size: 13px;">Mokėtinas avansas (50%):</td>
                            <td><b style="color: #113939; font-size: 16px;">${formattedDeposit} &euro;</b></td>
                        </tr>
                        <tr>
                            <td style="color: #607272; font-size: 13px;">Mokėjimo paskirtis:</td>
                            <td><em>Avansas už fotosesiją (${safeClient})</em></td>
                        </tr>
                    </table>
                    <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid #E8ECEB; font-size: 12px; color: #607272; line-height: 1.5;">
                        Rezervacijos laikas galutinai užfiksuojamas gavus avansą. Atlikę pavedimą, informuokite atsakydami į šį laišką.
                    </div>
                </td>
            </tr>
        </table>
    `;

    const text = [
        `Bankinio pavedimo rekvizitai:`,
        recipient ? `- Gavėjas: ${recipient}` : null,
        `- IBAN sąskaita: ${iban}`,
        bank ? `- Bankas: ${bank}` : null,
        `- Mokėtinas avansas (50%): ${formattedDeposit} EUR`,
        `- Mokėjimo paskirtis: Avansas už fotosesiją (${rawClient})`,
        `Rezervacijos laikas galutinai užfiksuojamas gavus avansą. Atlikę pavedimą, atsakykite į šį laišką.`
    ].filter(Boolean).join('\n');

    return { html, text };
}

export function getPaymentDetailsHtml(method, depositAmount, clientName, paymentDetails = null, lang = 'lt') {
    return getPaymentDetailsContent(method, depositAmount, clientName, paymentDetails, lang).html;
}

export function getPreparationTipsHtml(lang) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].tips;

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-radius: 4px;">
            <tr>
                <td style="padding: 20px 22px;">
                    <div style="font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 10px;">
                        ${t.title}
                    </div>
                    <ul style="margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.8; color: #4A5568;">
                        <li>${t.tip1}</li>
                        <li>${t.tip2}</li>
                        <li>${t.tip3}</li>
                    </ul>
                </td>
            </tr>
        </table>
    `;
}

export const texts = {
    lt: {
        greeting: "Sveiki, {{name}}!",
        badgeConfirmed: "Patvirtinta",
        badgePending: "Užklausa gauta",
        badgeCompleted: "Galerija paruošta",
        badgeCancelled: "Atšaukta",
        TFPNew: {
            sub: "DP.PORTFOLIO | TFP fotosesijos užklausa gauta",
            txt: "Dėkoju už jūsų anketą ir pasiūlytą fotosesijos idėją.\n\nUžklausa sėkmingai gauta. Peržiūrėsiu jūsų profilį ir netrukus susisieksiu suderinti fotosesijos detalių."
        },
        TFPConfirmed: {
            sub: "DP.PORTFOLIO | TFP fotosesija patvirtinta",
            txt: "Jūsų TFP fotosesija patvirtinta.\n\nŽemiau pateikta suderinta susitikimo data, laikas bei lokacija. Iki susitikimo!"
        },
        TFPRescheduled: {
            sub: "DP.PORTFOLIO | Fotosesijos laiko / vietos pakeitimas",
            txt: "Informuoju, kad fotosesijos data, laikas arba vieta buvo atnaujinta.\n\nPeržiūrėkite atnaujintą informaciją žemiau. Jei turite klausimų, atsakykite į šį laišką."
        },
        TFPCancelled: {
            sub: "DP.PORTFOLIO | Fotosesijos užklausa atšaukta",
            txt: "Informuoju, kad planuota fotosesija yra atšaukta.\n\nDėkoju už jūsų skirtą laiką ir susidomėjimą."
        },
        TFPCompleted: {
            sub: "DP.PORTFOLIO | Nuotraukos paruoštos",
            txt: "Dėkoju už bendradarbiavimą fotosesijos metu.\n\nJūsų nuotraukos paruoštos. Jas galite peržiūrėti ir atsisiųsti paspaudę žemiau esantį Wfolio galerijos mygtuką."
        },
        ServiceNew: {
            sub: "DP.PORTFOLIO | Užsakymas gautas",
            txt: "Dėkoju už jūsų paslaugų užsakymą.\n\nŽemiau pateikiama jūsų užsakymo santrauka ir pasirinktas apmokėjimo būdas. Peržiūrėsiu užklausą ir netrukus susisieksiu su jumis."
        },
        ServiceConfirmed: {
            sub: "DP.PORTFOLIO | Užsakymas patvirtintas – Apmokėjimo rekvizitai",
            txt: "Jūsų užsakymas patvirtintas.\n\nNorėdami galutinai rezervuoti fotosesijos laiką, atlikite 50% avanso mokėjimą pagal žemiau nurodytus rekvizitus."
        },
        ServiceDepositPaid: {
            sub: "DP.PORTFOLIO | Avansas gautas – Rezervacija patvirtinta",
            txt: "50% avansas gautas, fotosesijos laikas rezervuotas.\n\nIki susitikimo sutartoje vietoje! Likusi suma apmokama po fotosesijos."
        },
        ServiceFullyPaid: {
            sub: "DP.PORTFOLIO | Pilnas apmokėjimas gautas",
            txt: "Pilnas apmokėjimas už paslaugas gautas.\n\nNuoširdžiai dėkoju už bendradarbiavimą ir pasitikėjimą."
        },
        ServiceCompleted: {
            sub: "DP.PORTFOLIO | Nuotraukos paruoštos",
            txt: "Jūsų užsakymas atliktas, medžiaga paruošta.\n\nKviečiu peržiūrėti ir atsisiųsti darbus asmeninėje Wfolio galerijoje."
        },
        ServiceCancelled: {
            sub: "DP.PORTFOLIO | Užsakymas atšauktas",
            txt: "Informuoju, kad jūsų užsakymas yra atšauktas.\n\nJei turite klausimų, atsakykite tiesiogiai į šį laišką."
        },
        ServiceStatusUpdate: {
            sub: "DP.PORTFOLIO | Užsakymo statusas atnaujintas",
            txt: "Informuoju, kad jūsų užsakymo statusas sistemoje buvo atnaujintas."
        },
        labels: {
            date: "Data ir laikas:",
            loc: "Lokacija:",
            price: "Bendra kaina:",
            dep: "Mokėtinas avansas (50%):",
            rem: "Likutis po atlikimo:",
            srv: "Paslaugos paketas:",
            status: "Užsakymo statusas:",
            payMethod: "Apmokėjimo būdas:",
            notes: "Pastabos / Idėja:"
        },
        gallery: {
            title: "Jūsų nuotraukų galerija paruošta",
            desc: "Spustelėkite žemiau esantį mygtuką norėdami atidaryti asmeninę Wfolio galeriją ir atsisiųsti nuotraukas:",
            btn: "Atidaryti Wfolio galeriją &rarr;",
            note: "Galerijoje galite atsisiųsti visas nuotraukas ZIP archyvu arba po vieną pilna raiška."
        },
        receipt: {
            title: "Oficiali sąskaita / kvitas",
            desc: "Jūsų apmokėjimo patvirtinimo dokumentas paruoštas:",
            btn: "Atsisiųsti kvitą (PDF) &darr;"
        },
        tips: {
            title: "Naudingi patarimai prieš fotosesiją:",
            tip1: "<b>Apranga:</b> Rekomenduojame 1&ndash;2 derinius be ryškių logotipų. Geriausiai tinka natūralūs, žemės ar pasteliniai tonai.",
            tip2: "<b>Laikas:</b> Atvykite 5&ndash;10 minučių anksčiau, kad ramiai aptartume detales ir pradėtume laiku.",
            tip3: "<b>Nuotaika:</b> Jokios įtampos &ndash; fotosesija vyksta ramiai ir paprastai, padėsiu jaustis natūraliai."
        }
    },
    en: {
        greeting: "Hello, {{name}}!",
        badgeConfirmed: "Confirmed",
        badgePending: "Request Received",
        badgeCompleted: "Gallery Ready",
        badgeCancelled: "Cancelled",
        TFPNew: {
            sub: "DP.PORTFOLIO | TFP Photoshoot Request Received",
            txt: "Thank you for your inquiry and creative concept proposal.\n\nWe have received your registration. Dominik will review your profile and get back to you within 24–48 hours to coordinate all details."
        },
        TFPConfirmed: {
            sub: "DP.PORTFOLIO | Confirmed: TFP Photoshoot in Kaunas",
            txt: "Your TFP photoshoot is confirmed.\n\nPlease review the confirmed schedule, location, and preparation tips below."
        },
        TFPRescheduled: {
            sub: "DP.PORTFOLIO | Rescheduled: TFP Photoshoot Time or Location",
            txt: "Your TFP photoshoot date, time, or location has been updated.\n\nPlease review the updated details below. If the new timing does not work for you, reply directly to this email."
        },
        TFPCancelled: {
            sub: "DP.PORTFOLIO | Cancelled: TFP Photoshoot",
            txt: "Unfortunately, we have to cancel your planned TFP photoshoot.\n\nThank you very much for your interest."
        },
        TFPCompleted: {
            sub: "DP.PORTFOLIO | Your photos are ready",
            txt: "Thank you for collaborating on the shoot.\n\nAll selected images have been edited and uploaded to your private Wfolio gallery. Click the button below to view and download them."
        },
        ServiceNew: {
            sub: "DP.PORTFOLIO | Order Received & Summary",
            txt: "Thank you for choosing DP.PORTFOLIO photography and video services.\n\nYour order has been recorded. Review your booking summary below. We will contact you shortly to confirm all details."
        },
        ServiceConfirmed: {
            sub: "DP.PORTFOLIO | Order Confirmed – Payment Details",
            txt: "Your service order is confirmed.\n\nTo lock in your date, please transfer the 50% deposit using the payment details below."
        },
        ServiceDepositPaid: {
            sub: "DP.PORTFOLIO | Deposit Received – Booking Secured",
            txt: "We have received your 50% deposit payment. Thank you.\n\nYour session date and time are reserved. The remaining balance is settled after the session."
        },
        ServiceFullyPaid: {
            sub: "DP.PORTFOLIO | Full Payment Received",
            txt: "We confirm that full payment for your session has been received. Thank you!"
        },
        ServiceCompleted: {
            sub: "DP.PORTFOLIO | Service Completed – Files Ready",
            txt: "Your order is complete and uploaded to your personal Wfolio gallery."
        },
        ServiceCancelled: {
            sub: "DP.PORTFOLIO | Order Cancelled",
            txt: "Your order has been cancelled. If you have any questions, reply directly to this email."
        },
        ServiceStatusUpdate: {
            sub: "DP.PORTFOLIO | Order Status Updated",
            txt: "Your order status has been updated in our system."
        },
        labels: {
            date: "Date & Time:",
            loc: "Location:",
            price: "Total Price:",
            dep: "Deposit Due (50%):",
            rem: "Remaining Balance:",
            srv: "Service Package:",
            status: "Order Status:",
            payMethod: "Payment Method:",
            notes: "Notes / Vision:"
        },
        gallery: {
            title: "Your photo gallery is ready",
            desc: "Click the button below to open your private Wfolio gallery and download your photos:",
            btn: "Open Wfolio Gallery &rarr;",
            note: "You can download individual photos or the entire collection as a ZIP archive."
        },
        receipt: {
            title: "Official Receipt / Invoice",
            desc: "Your payment confirmation document is ready:",
            btn: "Download Receipt (PDF) &darr;"
        },
        tips: {
            title: "Helpful tips before your shoot:",
            tip1: "<b>Outfits:</b> Bring 1–2 coordinated outfits without large logos. Neutral or earthy tones photograph best.",
            tip2: "<b>Punctuality:</b> Please arrive 5–10 minutes early so we can discuss the session and start on time.",
            tip3: "<b>Mindset:</b> Relax and be yourself – the session is calm and easygoing."
        }
    },
    ru: {
        greeting: "Здравствуйте, {{name}}!",
        badgeConfirmed: "Подтверждено",
        badgePending: "Заявка получена",
        badgeCompleted: "Галерея готова",
        badgeCancelled: "Отменено",
        TFPNew: {
            sub: "DP.PORTFOLIO | Получена заявка на TFP фотосессию",
            txt: "Спасибо за вашу заявку и предложенную идею.\n\nМы получили анкету и свяжемся с вами в течение 24–48 часов для согласования деталей."
        },
        TFPConfirmed: {
            sub: "DP.PORTFOLIO | Подтверждено: TFP фотосессия",
            txt: "Ваша TFP фотосессия подтверждена.\n\nДетали встречи и советы по подготовке указаны ниже."
        },
        TFPRescheduled: {
            sub: "DP.PORTFOLIO | Обновлено время или место TFP фотосессии",
            txt: "Дата, время или локация вашей TFP фотосессии обновлены.\n\nОзнакомьтесь с новой информацией ниже."
        },
        TFPCancelled: {
            sub: "DP.PORTFOLIO | Отменено: TFP фотосессия",
            txt: "К сожалению, запланированная TFP фотосессия отменена.\n\nБлагодарим за проявленный интерес."
        },
        TFPCompleted: {
            sub: "DP.PORTFOLIO | Фотографии готовы",
            txt: "Спасибо за совместную съемку.\n\nОтобранные и обработанные фотографии загружены в вашу персональную галерею Wfolio."
        },
        ServiceNew: {
            sub: "DP.PORTFOLIO | Заказ получен",
            txt: "Благодарим за выбор услуг DP.PORTFOLIO.\n\nВаш заказ принят. Детали бронирования указаны ниже, мы свяжемся с вами в ближайшее время."
        },
        ServiceConfirmed: {
            sub: "DP.PORTFOLIO | Заказ подтвержден – Реквизиты для оплаты",
            txt: "Ваш заказ подтвержден.\n\nДля закрепления даты внесите 50% аванса по указанным ниже реквизитам."
        },
        ServiceDepositPaid: {
            sub: "DP.PORTFOLIO | Аванс получен. Бронь подтверждена",
            txt: "Мы получили ваш 50% аванс. Дата и время забронированы. Остаток оплачивается после съемки."
        },
        ServiceFullyPaid: {
            sub: "DP.PORTFOLIO | Полная оплата получена",
            txt: "Подтверждаем получение полной оплаты. Спасибо за доверие!"
        },
        ServiceCompleted: {
            sub: "DP.PORTFOLIO | Заказ выполнен. Материалы готовы",
            txt: "Ваш заказ выполнен и загружен в вашу персональную галерею Wfolio."
        },
        ServiceCancelled: {
            sub: "DP.PORTFOLIO | Заказ отменен",
            txt: "Сообщаем, что ваш заказ отменен. По всем вопросам ответьте на это письмо."
        },
        ServiceStatusUpdate: {
            sub: "DP.PORTFOLIO | Статус заказа обновлен",
            txt: "Статус вашего заказа обновлен в системе."
        },
        labels: {
            date: "Дата и время:",
            loc: "Локация:",
            price: "Общая стоимость:",
            dep: "Аванс (50%):",
            rem: "Остаток после съемки:",
            srv: "Пакет услуг:",
            status: "Статус заказа:",
            payMethod: "Способ оплаты:",
            notes: "Пожелания / Идея:"
        },
        gallery: {
            title: "Ваша галерея готова к просмотру",
            desc: "Нажмите кнопку ниже, чтобы открыть персональную галерею Wfolio:",
            btn: "Открыть галерею Wfolio &rarr;",
            note: "Вы можете скачать отдельные фотографии или весь архив."
        },
        receipt: {
            title: "Официальный чек / Квитанция",
            desc: "Ваш платежный документ готов:",
            btn: "Скачать квитанцию (PDF) &darr;"
        },
        tips: {
            title: "Полезные советы перед фотосессией:",
            tip1: "<b>Одежда:</b> Возьмите 1–2 образа без крупных логотипов в спокойных тонах.",
            tip2: "<b>Время:</b> Приходите за 5–10 минут до начала.",
            tip3: "<b>Настрой:</b> Фотосессия проходит спокойно, помогу чувствовать себя уверенно."
        }
    }
};

export function getDefaultContent(templateType, lang, data = {}) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang];
    const template = t[templateType] || t.ServiceStatusUpdate;

    const subject = template.sub;
    const rawName = data.name || data.clientName || '';
    const displayName = rawName ? escapeEmailHtml(rawName) : (safeLang === 'en' ? 'there' : (safeLang === 'ru' ? 'друг' : 'kliente'));
    const greeting = t.greeting.replace('{{name}}', displayName);
    const greetingPlain = t.greeting.replace('{{name}}', rawName || (safeLang === 'en' ? 'there' : (safeLang === 'ru' ? 'друг' : 'kliente')));
    const text = template.txt;

    let boxHtml = '';
    const textSections = [greetingPlain, text];

    if (data.finalPrice !== undefined && data.finalPrice !== null && data.finalPrice !== '') {
        const finalPriceNum = Number(data.finalPrice) || 0;
        const depositNum = data.depositAmount !== undefined ? Number(data.depositAmount) : finalPriceNum / 2;
        const remainingNum = data.remainingAmount !== undefined ? Number(data.remainingAmount) : (finalPriceNum - depositNum);
        const finalPriceFormatted = finalPriceNum.toFixed(2);
        const depositFormatted = depositNum.toFixed(2);
        const remainingFormatted = remainingNum.toFixed(2);
        const payMethod = String(data.paymentMethod || 'Bank Transfer');

        boxHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 22px 24px;">
                        <div style="font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 14px;">
                            ${safeLang === 'en' ? 'Order Summary' : (safeLang === 'ru' ? 'Детали заказа' : 'Užsakymo Suvestinė')}
                        </div>
                        <table role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                            ${data.serviceName ? `
                            <tr>
                                <td style="width: 155px; color: #607272; font-size: 13px;">${t.labels.srv}</td>
                                <td><b>${escapeEmailHtml(data.serviceName)}</b></td>
                            </tr>` : ''}
                            ${data.date_time ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.date}</td>
                                <td><b>${escapeEmailHtml(data.date_time)}</b></td>
                            </tr>` : ''}
                            ${data.location ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.loc}</td>
                                <td><b>${escapeEmailHtml(data.location)}</b></td>
                            </tr>` : ''}
                            <tr style="border-top: 1px solid #E8ECEB;">
                                <td style="color: #607272; font-size: 13px; padding-top: 10px;">${t.labels.price}</td>
                                <td style="padding-top: 10px;"><b>${finalPriceFormatted} &euro;</b></td>
                            </tr>
                            <tr>
                                <td style="color: #113939; font-size: 13px; font-weight: bold;">${t.labels.dep}</td>
                                <td><b style="color: #113939; font-size: 16px;">${depositFormatted} &euro;</b></td>
                            </tr>
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.rem}</td>
                                <td>${remainingFormatted} &euro;</td>
                            </tr>
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.payMethod}</td>
                                <td><span style="background-color: #EDF2F1; padding: 2px 8px; border-radius: 3px; font-size: 13px; font-weight: 600; color: #113939;">${escapeEmailHtml(payMethod)}</span></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;

        textSections.push([
            safeLang === 'en' ? 'Order Summary:' : (safeLang === 'ru' ? 'Детали заказа:' : 'Užsakymo suvestinė:'),
            data.serviceName ? `- ${t.labels.srv} ${data.serviceName}` : null,
            data.date_time ? `- ${t.labels.date} ${data.date_time}` : null,
            data.location ? `- ${t.labels.loc} ${data.location}` : null,
            `- ${t.labels.price} ${finalPriceFormatted} EUR`,
            `- ${t.labels.dep} ${depositFormatted} EUR`,
            `- ${t.labels.rem} ${remainingFormatted} EUR`,
            `- ${t.labels.payMethod} ${payMethod}`
        ].filter(Boolean).join('\n'));

        if (templateType === 'ServiceConfirmed' || templateType === 'ServiceNew' || templateType === 'ServiceStatusUpdate') {
            const paymentContent = getPaymentDetailsContent(payMethod, depositFormatted, rawName, data.paymentDetails || null, safeLang);
            boxHtml += paymentContent.html;
            textSections.push(paymentContent.text);
            boxHtml += getPreparationTipsHtml(safeLang);
        } else if (templateType === 'ServiceDepositPaid') {
            boxHtml += getPreparationTipsHtml(safeLang);
        }
    } else if (data.date_time || data.location) {
        boxHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 22px 24px;">
                        <div style="font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 14px;">
                            ${safeLang === 'en' ? 'Photoshoot Session Details' : (safeLang === 'ru' ? 'Детали фотосессии' : 'Fotosesijos Detalės')}
                        </div>
                        <table role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                            ${data.date_time ? `
                            <tr>
                                <td style="width: 140px; color: #607272; font-size: 13px;">${t.labels.date}</td>
                                <td><b>${escapeEmailHtml(data.date_time)}</b></td>
                            </tr>` : ''}
                            ${data.location ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.loc}</td>
                                <td><b>${escapeEmailHtml(data.location)}</b></td>
                            </tr>` : ''}
                            ${data.idea ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.notes}</td>
                                <td><em>${escapeEmailHtml(data.idea)}</em></td>
                            </tr>` : ''}
                            ${data.status ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.status}</td>
                                <td><b style="color: #113939; text-transform: uppercase;">${escapeEmailHtml(data.status)}</b></td>
                            </tr>` : ''}
                        </table>
                    </td>
                </tr>
            </table>
        `;

        textSections.push([
            data.date_time ? `- ${t.labels.date} ${data.date_time}` : null,
            data.location ? `- ${t.labels.loc} ${data.location}` : null,
            data.idea ? `- ${t.labels.notes} ${data.idea}` : null,
            data.status ? `- ${t.labels.status} ${data.status}` : null
        ].filter(Boolean).join('\n'));

        if (templateType === 'TFPConfirmed' || templateType === 'TFPRescheduled') {
            boxHtml += getPreparationTipsHtml(safeLang);
        }
    } else if (data.status) {
        boxHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 18px 22px; font-size: 15px; color: #1A2B2B;">
                        <b>${t.labels.status}</b> <span style="color: #113939; font-weight: bold; text-transform: uppercase; margin-left: 8px;">${escapeEmailHtml(data.status)}</span>
                    </td>
                </tr>
            </table>
        `;
        textSections.push(`${t.labels.status} ${data.status}`);
    }

    textSections.push(`--\nDP.PORTFOLIO | ${BRAND.email}\n${BRAND.websiteUrl}`);
    const plainText = textSections.filter(Boolean).join('\n\n');

    return { subject, greeting, text, boxHtml, plainText };
}

export function getGalleryHtml(lang, url) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].gallery;
    const safeUrl = escapeEmailHtml(url);

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0; background-color: #113939; border-radius: 6px;">
            <tr>
                <td align="center" style="padding: 32px 24px; text-align: center;">
                    <div style="font-size: 18px; letter-spacing: 1.5px; text-transform: uppercase; color: #FFFFFF; font-weight: 600; margin-bottom: 8px;">
                        ${t.title}
                    </div>
                    <p style="margin: 0 0 20px 0; color: #C2D6D4; font-size: 14px; line-height: 1.6; max-width: 460px;">
                        ${t.desc}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 14px auto;">
                        <tr>
                            <td align="center" style="background-color: #FFFFFF; border-radius: 4px;">
                                <a href="${safeUrl}" target="_blank" style="display: inline-block; padding: 14px 34px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; text-decoration: none;">
                                    ${t.btn}
                                </a>
                            </td>
                        </tr>
                    </table>
                    <div style="font-size: 12px; color: #A2BFBD;">
                        ${t.note}
                    </div>
                </td>
            </tr>
        </table>
    `;
}

export function getReceiptHtml(lang, urlOrLinks, fileName = 'Dokumentas.pdf') {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].receipt;

    let linksHtml = '';
    if (Array.isArray(urlOrLinks) && urlOrLinks.length > 0) {
        const itemsHtml = urlOrLinks.map(item => {
            const u = escapeEmailHtml(item?.url || '');
            const fn = escapeEmailHtml(item?.filename || 'Dokumentas');
            if (!u) return '';
            return `<div style="margin-bottom: 8px;"><a href="${u}" target="_blank" style="display: inline-block; padding: 10px 22px; background-color: #2A5C5C; border-radius: 4px; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #FFFFFF; text-decoration: none;">Atsisiųsti: ${fn} &darr;</a></div>`;
        }).filter(Boolean).join('');
        linksHtml = itemsHtml || `<div style="display: inline-block; padding: 7px 14px; background: #F0F5F4; border: 1px solid #113939; border-radius: 4px; color: #113939; font-size: 12px; font-weight: 600;">Dokumentai pridėti prie šio el. laiško</div>`;
    } else {
        const safeUrl = escapeEmailHtml(typeof urlOrLinks === 'string' ? urlOrLinks : '');
        linksHtml = safeUrl ? `
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                    <td align="center" style="background-color: #2A5C5C; border-radius: 4px;">
                        <a href="${safeUrl}" target="_blank" style="display: inline-block; padding: 11px 26px; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #FFFFFF; text-decoration: none;">
                            ${t.btn}
                        </a>
                    </td>
                </tr>
            </table>
        ` : `
            <div style="display: inline-block; padding: 7px 14px; background: #F0F5F4; border: 1px solid #113939; border-radius: 4px; color: #113939; font-size: 12px; font-weight: 600;">
                Dokumentas (-ai) pridėti prie šio el. laiško
            </div>
        `;
    }

    const safeFile = escapeEmailHtml(fileName);

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #F7FAF9; border: 1px solid #2A5C5C; border-radius: 6px;">
            <tr>
                <td align="center" style="padding: 22px 20px; text-align: center;">
                    <div style="font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 6px;">
                        ${t.title}
                    </div>
                    <p style="margin: 0 0 14px 0; font-size: 13px; color: #607272; line-height: 1.6;">
                        ${t.desc}<br>
                        <strong style="color: #113939;">Failai: ${safeFile}</strong>
                    </p>
                    ${linksHtml}
                </td>
            </tr>
        </table>
    `;
}

export function buildFinalHtml(greeting, text, boxHtml = '', galleryHtml = '', receiptHtml = '') {
    const formattedText = String(text || '').replace(/\n/g, '<br>');

    return `${emailWrapperStart}
        <h2 style="color: #113939; font-size: 22px; font-weight: 500; margin: 0 0 16px 0;">
            ${greeting}
        </h2>
        <div style="color: #2D3748; font-size: 15px; line-height: 1.7; margin-bottom: 20px;">
            ${formattedText}
        </div>
        ${boxHtml || ''}
        ${receiptHtml || ''}
        ${galleryHtml || ''}
    ${emailWrapperEnd}`;
}

export function buildEmail(templateType, lang, data = {}) {
    const typeKey = templateType === 'New' ? 'TFPNew' : templateType;
    const { subject, greeting, text, boxHtml, plainText } = getDefaultContent(typeKey, lang, data);
    const html = buildFinalHtml(greeting, escapeEmailHtml(text), boxHtml, '', '');
    return { subject, text: plainText, html };
}

export const EMAIL_CONFIG = {
    system: {
        email: "info@dominikphotofficial.lt",
        from: "DP.PORTFOLIO Sistema <info@dominikphotofficial.lt>",
        replyTo: "info@dominikphotofficial.lt",
        noReplyNote: "Šis el. laiškas yra išsiųstas automatiškai iš sisteminio adreso."
    },
    general: {
        email: "info@dominikphotofficial.lt",
        from: "DP.PORTFOLIO <info@dominikphotofficial.lt>",
        replyTo: "info@dominikphotofficial.lt"
    }
};

export function buildInvitationEmail({ name, email, role, loginUrl }) {
    const roleLabels = {
        superadmin: 'Super Administratorius',
        manager: 'Vadybininkas',
        photographer: 'Fotografas',
        accountant: 'Buhalteris'
    };
    const roleName = roleLabels[role] || role || 'Komandos narys';
    const targetUrl = loginUrl || `${BRAND.websiteUrl}/admin.html`;
    const safeName = escapeEmailHtml(name || 'kolega');
    const safeEmail = escapeEmailHtml(email || '');

    const subject = `Kvietimas prisijungti prie DP.PORTFOLIO valdymo sistemos`;
    const greeting = `Sveiki, ${safeName}!`;
    const bodyHtmlText = `Jums suteikta prieiga prie <strong>DP.PORTFOLIO</strong> valdymo skydo.`;

    const boxHtml = `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
            <tr>
                <td style="padding: 24px;">
                    <div style="font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 12px;">
                        Paskyros duomenys ir rolė
                    </div>
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1A2B2B;">
                        <strong>Prisijungimo el. paštas:</strong> <code style="background: #eef2f2; padding: 2px 6px; border-radius: 3px; font-weight: bold; color: #113939;">${safeEmail}</code><br>
                        <strong>Suteikta rolė:</strong> <span style="display: inline-block; background: #eef5f4; color: #113939; padding: 2px 8px; border-radius: 3px; font-weight: bold; font-size: 12px; margin-top: 4px;">${escapeEmailHtml(roleName)}</span>
                    </p>
                    <div style="border-top: 1px solid #E8ECEB; padding-top: 14px; margin-top: 14px;">
                        <strong style="color: #113939; font-size: 14px;">Kaip prisijungti pirmą kartą:</strong>
                        <ol style="margin: 10px 0 0 0; padding-left: 20px; font-size: 13.5px; color: #4A5568; line-height: 1.6;">
                            <li>Atverkite valdymo skydą: <a href="${escapeEmailHtml(targetUrl)}" style="color: #113939;">${escapeEmailHtml(targetUrl)}</a>.</li>
                            <li>Prisijunkite su savo Google paskyra arba pasirinkite slaptažodžio nustatymą per el. paštą <strong>${safeEmail}</strong>.</li>
                        </ol>
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 22px auto 6px auto;">
                        <tr>
                            <td align="center" style="background-color: #113939; border-radius: 4px;">
                                <a href="${escapeEmailHtml(targetUrl)}" target="_blank" style="display: inline-block; padding: 13px 30px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #FFFFFF; text-decoration: none;">
                                    Atidaryti valdymo skydą &rarr;
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div style="font-size: 12px; color: #607272; line-height: 1.5; background: #F4F6F5; padding: 10px 14px; border-radius: 4px; margin-top: 16px;">
            ${EMAIL_CONFIG.system.noReplyNote} Kilus klausimams rašykite: <a href="mailto:${EMAIL_CONFIG.general.email}" style="color: #113939; font-weight: bold;">${EMAIL_CONFIG.general.email}</a>.
        </div>
    `;

    const html = buildFinalHtml(greeting, bodyHtmlText, boxHtml, '', '');
    const text = `Sveiki, ${name || 'kolega'}!\n\nJums suteikta prieiga prie DP.PORTFOLIO valdymo skydo.\n- El. paštas: ${email}\n- Rolė: ${roleName}\n- Nuoroda: ${targetUrl}\n\nPrisijunkite su savo Google paskyra arba nustatykite slaptažodį prisijungimo lange.\n\n--\nDP.PORTFOLIO | ${EMAIL_CONFIG.general.email}`;
    return { subject, text, html };
}

export function buildPasswordResetInstructionEmail({ name, email, loginUrl }) {
    const targetUrl = loginUrl || `${BRAND.websiteUrl}/admin.html`;
    const subject = `DP.PORTFOLIO | Slaptažodžio nustatymo instrukcija`;
    const greeting = `Sveiki, ${escapeEmailHtml(name || 'kolega')}!`;
    const bodyHtmlText = `Siunčiame instrukciją, kaip atstatyti arba susikurti slaptažodį prisijungimui prie DP.PORTFOLIO valdymo skydo.`;

    const boxHtml = `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
            <tr>
                <td style="padding: 24px;">
                    <div style="font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 12px;">
                        Slaptažodžio atstatymo žingsniai
                    </div>
                    <ol style="margin: 0; padding-left: 20px; font-size: 14px; color: #2D3748; line-height: 1.65;">
                        <li>Atidarykite prisijungimo puslapį: <a href="${escapeEmailHtml(targetUrl)}" target="_blank" style="color: #113939; font-weight: bold;">${escapeEmailHtml(targetUrl)}</a></li>
                        <li>Spustelėkite „Pamiršote slaptažodį?“</li>
                        <li>Įrašykite savo autorizuotą el. paštą: <strong>${escapeEmailHtml(email)}</strong></li>
                        <li>Paspauskite el. paštu gautą nuorodą naujam slaptažodžiui įvesti.</li>
                    </ol>
                </td>
            </tr>
        </table>
    `;

    const html = buildFinalHtml(greeting, bodyHtmlText, boxHtml, '', '');
    const text = `Sveiki, ${name || 'kolega'}!\n\nSlaptažodžio atstatymo žingsniai:\n1. Atidarykite: ${targetUrl}\n2. Pasirinkite slaptažodžio nustatymo nuorodą\n3. Įveskite el. paštą: ${email}\n4. Paspauskite gautą nuorodą.\n\n--\nDP.PORTFOLIO | ${EMAIL_CONFIG.general.email}`;
    return { subject, text, html };
}

export function buildReviewInvitationEmail({ clientName, sessionTitle, type, galleryUrl, reviewUrl, token }) {
    const cleanType = type === 'tfp' ? 'tfp' : 'service';
    const targetReviewUrl = reviewUrl || (token
        ? `${BRAND.websiteUrl}/review?token=${encodeURIComponent(token)}`
        : `${BRAND.websiteUrl}/review?name=${encodeURIComponent(clientName || '')}&type=${cleanType}`);
    const projectNoun = cleanType === 'tfp' ? 'kūrybiniam TFP projektui' : 'fotosesijai';
    const subject = `Pasidalykite atsiliepimu apie fotosesiją | DP.PORTFOLIO`;
    const greeting = `Sveiki, ${escapeEmailHtml(clientName || 'kliente')}!`;
    const sessionPart = sessionTitle ? ` („${escapeEmailHtml(sessionTitle)}“)` : '';
    const bodyHtmlText = `Dėkojame, kad pasirinkote <strong>DP.PORTFOLIO</strong> savo ${projectNoun}${sessionPart}.\n\nJūsų nuomonė padeda tobulėti ir kitiems klientams bei modeliams lengviau apsispręsti. Spustelėjus žemiau esantį mygtuką, jūsų sesijos duomenys bus atpažinti automatiškai:`;

    const boxHtml = `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
            <tr>
                <td style="padding: 24px; text-align: center;">
                    <div style="font-size: 14px; letter-spacing: 1.5px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 12px;">
                        Palikti atsiliepimą
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto;">
                        <tr>
                            <td align="center" style="background-color: #113939; border-radius: 4px;">
                                <a href="${escapeEmailHtml(targetReviewUrl)}" target="_blank" style="display: inline-block; padding: 13px 30px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #FFFFFF; text-decoration: none;">
                                    Palikti atsiliepimą &rarr;
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    `;

    const galleryHtml = galleryUrl ? getGalleryHtml('lt', galleryUrl) : '';
    const html = buildFinalHtml(greeting, bodyHtmlText, boxHtml, galleryHtml, '');
    const text = `Sveiki, ${clientName || 'kliente'}!\n\nDėkojame už bendradarbiavimą su DP.PORTFOLIO${sessionTitle ? ` (${sessionTitle})` : ''}.\nJei turite minutę, palikite atsiliepimą per asmeninę nuorodą čia: ${targetReviewUrl}${galleryUrl ? `\nJūsų galerija: ${galleryUrl}` : ''}\n\n--\nDP.PORTFOLIO | ${BRAND.email}`;
    return { subject, text, html };
}
