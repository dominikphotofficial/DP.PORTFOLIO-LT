// ==============================================================================
// DP.PORTFOLIO - Premium Editorial Email Templates
// Dominik Šuškevič • Fotografija & Videografija • Kaunas, Lietuva
// ==============================================================================

const BRAND = {
    name: "DP.PORTFOLIO",
    author: "Dominik Šuškevič",
    logoUrl: "https://iili.io/fjNLbs4.png",
    websiteUrl: "https://portfolio.dominikphotofficial.lt",
    instagramUrl: "https://instagram.com/dominikphotofficial",
    instagramHandle: "@dominikphotofficial",
    email: "dominikphotofficial.lt@gmail.com",
    iban: "LT867300010171188764",
    recipientName: "DOMINIK ŠUŠKEVIČ",
    colors: {
        darkGreen: "#113939",
        accentLight: "#2A5C5C",
        accentGold: "#C5A880",
        bgCream: "#F7F6F2",
        cardBg: "#FFFFFF",
        textDark: "#1A2B2B",
        textMuted: "#607272",
        borderLight: "#E8ECEB"
    }
};

const emailWrapperStart = `
<!DOCTYPE html>
<html lang="lt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DP.PORTFOLIO</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <!-- Preview Text Spacer -->
    <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all; font-size: 1px; line-height: 1px; color: #F4F6F5;">
        DP.PORTFOLIO • Dominik Šuškevič fotografijos ir videografijos pranešimas.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F6F5; padding: 40px 15px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 35px rgba(17,57,57,0.08); border: 1px solid #E8ECEB;">
                    
                    <!-- Header Banner -->
                    <tr>
                        <td align="center" style="background-color: #113939; padding: 32px 25px; text-align: center;">
                            <a href="${BRAND.websiteUrl}" target="_blank" style="text-decoration: none; display: inline-block;">
                                <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="58" height="58" style="display: block; margin: 0 auto 12px auto; border: 0; outline: none;">
                                <div style="font-family: 'Josefin Sans', -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 18px; letter-spacing: 4px; text-transform: uppercase; color: #FFFFFF; font-weight: 300; line-height: 1.2;">${BRAND.name}</div>
                                <div style="font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: #A2BFBD; margin-top: 5px;">${BRAND.author} &bull; Fotografija & Videografija</div>
                            </a>
                        </td>
                    </tr>

                    <!-- Gold Accent Line -->
                    <tr>
                        <td style="height: 3px; background: linear-gradient(90deg, #113939 0%, #C5A880 50%, #113939 100%);"></td>
                    </tr>

                    <!-- Email Content Area -->
                    <tr>
                        <td style="padding: 38px 32px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
`;

const emailWrapperEnd = `
                        </td>
                    </tr>

                    <!-- Footer Section -->
                    <tr>
                        <td style="background-color: #FAFBFB; border-top: 1px solid #E8ECEB; padding: 30px 32px; text-align: center; font-family: -apple-system, BlinkMacSystemFont, Arial, sans-serif;">
                            <p style="margin: 0 0 12px 0; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 600;">
                                ${BRAND.name} &bull; Dominik Šuškevič
                            </p>
                            
                            <p style="margin: 0 0 18px 0; font-size: 13px; color: #607272; line-height: 1.8;">
                                Kaunas, Lietuva &bull; Fujifilm X Cinema & Photography<br>
                                Instagram: <a href="${BRAND.instagramUrl}" target="_blank" style="color: #113939; text-decoration: underline; font-weight: 600;">${BRAND.instagramHandle}</a> &bull;
                                Svetainė: <a href="${BRAND.websiteUrl}" target="_blank" style="color: #113939; text-decoration: underline; font-weight: 600;">portfolio.dominikphotofficial.lt</a><br>
                                El. paštas: <a href="mailto:${BRAND.email}" style="color: #113939; text-decoration: none;">${BRAND.email}</a>
                            </p>

                            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 16px auto;">
                                <tr>
                                    <td style="padding: 0 8px;">
                                        <a href="${BRAND.instagramUrl}" target="_blank" style="display: inline-block; background: #113939; color: #ffffff; padding: 6px 14px; border-radius: 3px; font-size: 11px; letter-spacing: 1px; text-decoration: none; text-transform: uppercase;">Instagram</a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="${BRAND.websiteUrl}" target="_blank" style="display: inline-block; background: #2A5C5C; color: #ffffff; padding: 6px 14px; border-radius: 3px; font-size: 11px; letter-spacing: 1px; text-decoration: none; text-transform: uppercase;">Portfolio</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0; font-size: 11px; color: #9AA7A7; line-height: 1.5;">
                                &copy; 2026 DP Corporation. Dominik Šuškevič. Visos teisės saugomos.<br>
                                Šis el. laiškas yra konfidencialus ir skirtas tik nurodytam gavėjui.
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

export function getPaymentDetailsHtml(method, depositAmount, clientName) {
    const formattedDeposit = Number(depositAmount || 0).toFixed(2);
    const safeClient = clientName ? clientName : 'Fotosesija';

    if (method === 'PayPal') {
        return `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0; background-color: #FFFFFF; border: 1px solid #003087; border-left: 5px solid #003087; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,48,135,0.06);">
                <tr>
                    <td style="padding: 22px 24px;">
                        <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #003087; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center;">
                            PayPal Apmokėjimo Informacija
                        </div>
                        <table role="presentation" width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                            <tr>
                                <td style="width: 140px; color: #607272; font-size: 13px;">Gavėjo PayPal:</td>
                                <td>
                                    <span style="background-color: #EDF2F7; padding: 4px 9px; border-radius: 3px; font-family: monospace; font-size: 14px; font-weight: bold; color: #003087;">${BRAND.email}</span>
                                </td>
                            </tr>
                            <tr>
                                <td style="color: #607272; font-size: 13px;">Gavėjas:</td>
                                <td><b>Dominik Šuškevič</b></td>
                            </tr>
                            <tr>
                                <td style="color: #607272; font-size: 13px;">Mokėtinas avansas (50%):</td>
                                <td><b style="color: #003087; font-size: 17px;">${formattedDeposit} &euro;</b></td>
                            </tr>
                            <tr>
                                <td style="color: #607272; font-size: 13px;">Paskirtis / Pastaba:</td>
                                <td><em>Avansas už fotosesiją &ndash; ${safeClient}</em></td>
                            </tr>
                        </table>
                        <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #EDF2F7; font-size: 12px; color: #718096; line-height: 1.5;">
                            &bull; Pervesdami nurodykite savo vardą ir pasirinktą paslaugą. Pervedę atsakykite į šį laišką patvirtinimui.
                        </div>
                    </td>
                </tr>
            </table>
        `;
    }

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0; background-color: #FFFFFF; border: 1px solid #113939; border-left: 5px solid #113939; border-radius: 4px; box-shadow: 0 4px 15px rgba(17,57,57,0.06);">
            <tr>
                <td style="padding: 22px 24px;">
                    <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 12px;">
                        Bankinio Pavedimo Rekvizitai
                    </div>
                    <table role="presentation" width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                        <tr>
                            <td style="width: 140px; color: #607272; font-size: 13px;">Gavėjas:</td>
                            <td><b>${BRAND.recipientName}</b></td>
                        </tr>
                        <tr>
                            <td style="color: #607272; font-size: 13px;">IBAN Sąskaita:</td>
                            <td>
                                <span style="background-color: #F0F5F4; border: 1px solid #D5E2E0; padding: 4px 9px; border-radius: 3px; font-family: monospace; font-size: 15px; font-weight: bold; color: #113939;">${BRAND.iban}</span>
                            </td>
                        </tr>
                        <tr>
                            <td style="color: #607272; font-size: 13px;">Mokėtinas avansas (50%):</td>
                            <td><b style="color: #113939; font-size: 17px;">${formattedDeposit} &euro;</b></td>
                        </tr>
                        <tr>
                            <td style="color: #607272; font-size: 13px;">Mokėjimo paskirtis:</td>
                            <td><em>Avansas už fotosesiją &ndash; ${safeClient}</em></td>
                        </tr>
                    </table>
                    <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #E8ECEB; font-size: 12px; color: #607272; line-height: 1.5;">
                        &bull; Rezervacijos laikas galutinai patvirtinamas gavus avansą. Atlikę pervedimą, praneškite atsakydami į šį laišką.
                    </div>
                </td>
            </tr>
        </table>
    `;
}

export function getPreparationTipsHtml(lang) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].tips;

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-radius: 4px;">
            <tr>
                <td style="padding: 20px 22px;">
                    <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 10px;">
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
        badgePending: "Užklausa Gauta",
        badgeCompleted: "Galerija Paruošta",
        badgeCancelled: "Atšaukta",
        TFPNew: {
            sub: "DP.PORTFOLIO | Gauta TFP fotosesijos užklausa",
            txt: "Labai ačiū už jūsų užklausą ir pasiūlytą kūrybinę idėją!\n\nJūsų registraciją sėkmingai gavome. Dominik peržiūrės jūsų anketą, Instagram/socialinį profilį bei idėją ir susisieks su jumis per artimiausias 24–48 valandas suderinti detalių."
        },
        TFPConfirmed: {
            sub: "DP.PORTFOLIO | Patvirtinta: TFP Fotosesija Kaune",
            txt: "Mums labai patiko jūsų idėja, todėl su džiaugsmu patvirtiname jūsų TFP fotosesiją!\n\nNekantraujame kartu sukurti išskirtinių kinematografinių kadrų. Žemiau pateikiame suderintą susitikimo laiką, lokaciją bei naudingus patarimus pasiruošimui."
        },
        TFPRescheduled: {
            sub: "DP.PORTFOLIO | Atnaujinta: TFP Fotosesijos laikas arba vieta",
            txt: "Norime informuoti, kad jūsų TFP fotosesijos data, laikas arba vieta buvo atnaujinta.\n\nPeržiūrėkite atnaujintą informaciją žemiau. Jei šis laikas jums netinka, prašome iškart atsakyti į šį laišką su jums patogia alternatyva."
        },
        TFPCancelled: {
            sub: "DP.PORTFOLIO | Atšaukta: TFP Fotosesija",
            txt: "Apgailestaujame, tačiau dėl nenumatytų aplinkybių ar pasikeitusių planų turime atšaukti jūsų suplanuotą TFP fotosesiją.\n\nNuoširdžiai dėkojame už jūsų norą bendradarbiauti ir tikimės, kad ateityje dar turėsime progą sukurti bendrą projektą."
        },
        TFPCompleted: {
            sub: "DP.PORTFOLIO | Ačiū už fotosesiją! Nuotraukos paruoštos",
            txt: "Didelis ačiū už jūsų energiją, profesionalumą ir puikią nuotaiką fotosesijos metu!\n\nVisos geriausios nuotraukos jau kruopščiai atrinktos, autoriniu būdu retušuotos ir patalpintos jūsų asmeninėje Wfolio galerijoje. Spustelėkite žemiau esantį mygtuką, kad peržiūrėtumėte ir atsisiųstumėte kadrus aukščiausia raiška."
        },
        ServiceNew: {
            sub: "DP.PORTFOLIO | Užsakymo patvirtinimas & Informacija",
            txt: "Nuoširdžiai dėkojame, kad pasirinkote DP.PORTFOLIO profesionalias paslaugas!\n\nJūsų užklausa sėkmingai priimta. Peržiūrėkite žemiau pateiktą informaciją ir mokėjimo rekvizitus. Netrukus susisieksime patvirtinti visų detalių."
        },
        ServiceConfirmed: {
            sub: "DP.PORTFOLIO | Užsakymas patvirtintas – Mokėjimo informacija",
            txt: "Jūsų paslaugų užsakymas yra oficialiai patvirtintas!\n\nNorėdami galutinai rezervuoti laiką mūsų kalendoriuje, atlikite 50% avanso mokėjimą pagal žemiau nurodytus jūsų pasirinkto mokėjimo būdo rekvizitus. Gavę mokėjimą, iškart atsiųsime patvirtinimą."
        },
        ServiceDepositPaid: {
            sub: "DP.PORTFOLIO | Avansas gautas. Rezervacija pilnai patvirtinta!",
            txt: "Sėkmingai gavome jūsų 50% avansinį mokėjimą. Ačiū!\n\nJūsų pasirinktas fotosesijos laikas ir data yra galutinai užrakinti mūsų kalendoriuje. Susitiksime sutartoje vietoje! Likusią sumos dalį galėsite atsiskaityti po fotosesijos atlikimo."
        },
        ServiceFullyPaid: {
            sub: "DP.PORTFOLIO | Pilnas apmokėjimas gautas. Ačiū!",
            txt: "Informuojame, kad sėkmingai gavome pilną apmokėjimą už atliktas paslaugas.\n\nNuoširdžiai dėkojame už bendradarbiavimą, sklandų bendravimą ir pasitikėjimą DP.PORTFOLIO kūrybine komanda!"
        },
        ServiceCompleted: {
            sub: "DP.PORTFOLIO | Paslauga atlikta. Jūsų nuotraukos paruoštos!",
            txt: "Jūsų užsakymas yra sėkmingai atliktas!\n\nVisi atrinkti kadrai buvo kruopščiai retušuoti, sukalibruotomis spalvomis ir patalpinti jūsų asmeninėje Wfolio galerijoje. Kviečiame peržiūrėti ir atsisiųsti pilna kokybe."
        },
        ServiceCancelled: {
            sub: "DP.PORTFOLIO | Užsakymas atšauktas",
            txt: "Informuojame, kad jūsų užsakymas buvo atšauktas.\n\nJeigu užsakymas buvo atšauktas per klaidą arba turite papildomų klausimų, maloniai prašome atsakyti į šį el. laišką."
        },
        ServiceStatusUpdate: {
            sub: "DP.PORTFOLIO | Užsakymo statuso atnaujinimas",
            txt: "Informuojame, kad jūsų užsakymo statusas DP.PORTFOLIO sistemoje buvo atnaujintas."
        },
        labels: {
            date: "Data ir laikas:",
            loc: "Lokacija:",
            price: "Bendra kaina:",
            dep: "Mokėtinas avansas (50%):",
            rem: "Likutis po fotosesijos:",
            srv: "Paslaugos paketas:",
            status: "Užsakymo statusas:",
            payMethod: "Apmokėjimo būdas:",
            notes: "Pastabos / Idėja:"
        },
        gallery: {
            title: "Jūsų nuotraukų galerija paruošta",
            desc: "Spustelėkite žemiau esantį mygtuką norėdami atidaryti asmeninę Wfolio galeriją ir atsisiųsti nuotraukas be jokių suspaudimų:",
            btn: "Atidaryti Wfolio Galeriją &rarr;",
            note: "Galerijoje galite atsisiųsti visas nuotraukas ZIP archyvu arba po vieną pilna raiška."
        },
        receipt: {
            title: "Oficialus Sąskaita / Kvitas",
            desc: "Jūsų apmokėjimo patvirtinimo dokumentas yra paruoštas. Spustelėkite mygtuką žemiau failo atsisiuntimui:",
            btn: "Atsisiųsti Kvitą (PDF / Dokumentas) &darr;"
        },
        tips: {
            title: "Naudingi patarimai prieš fotosesiją:",
            tip1: "<b>Apranga:</b> Rekomenduojame 1&ndash;2 derinius be ryškių logotipų. Pirmenybę teikite natūraliems, žemės, pasteliniams arba elegantiškiems tonams.",
            tip2: "<b>Laikas:</b> Prašome atvykti 5&ndash;10 minučių anksčiau, kad ramiai aptartume kadrus ir pradėtume laiku.",
            tip3: "<b>Nuotaika:</b> Atsipalaiduokite ir būkite savimi &ndash; mes padėsime surasti gražiausius kampus ir natūralias pozas."
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
            txt: "Thank you for your inquiry and creative concept proposal!\n\nWe have received your registration. Dominik will review your profile and vision, and get back to you within 24–48 hours to coordinate all details."
        },
        TFPConfirmed: {
            sub: "DP.PORTFOLIO | Confirmed: TFP Photoshoot in Kaunas",
            txt: "We loved your idea and are thrilled to officially confirm your TFP photoshoot!\n\nWe look forward to creating stunning cinematic imagery together. Please review the confirmed schedule, location, and preparation tips below."
        },
        TFPRescheduled: {
            sub: "DP.PORTFOLIO | Rescheduled: TFP Photoshoot Time or Location",
            txt: "We would like to inform you that your TFP photoshoot date, time, or location has been updated.\n\nPlease review the updated details below. If the new timing does not work for you, simply reply directly to this email."
        },
        TFPCancelled: {
            sub: "DP.PORTFOLIO | Cancelled: TFP Photoshoot",
            txt: "We sincerely apologize, but due to unforeseen circumstances or scheduling constraints, we have to cancel your planned TFP photoshoot.\n\nThank you very much for your interest, and we hope to collaborate on a future project."
        },
        TFPCompleted: {
            sub: "DP.PORTFOLIO | Thank you for the shoot! Your photos are ready",
            txt: "A huge thank you for your energy, style, and great mood during our shoot!\n\nAll selected images have been carefully curated, color-graded, and uploaded to your private Wfolio gallery. Click the button below to view and download full-resolution images."
        },
        ServiceNew: {
            sub: "DP.PORTFOLIO | Order Received & Details",
            txt: "Thank you for choosing DP.PORTFOLIO professional photography & videography!\n\nYour order has been recorded. Review your booking summary and payment instructions below. We will reach out shortly to finalize all details."
        },
        ServiceConfirmed: {
            sub: "DP.PORTFOLIO | Order Confirmed – Payment Details",
            txt: "Your service order is officially confirmed!\n\nTo lock in your date in our calendar, please transfer the 50% deposit using your selected payment details below. We will send a confirmation receipt once received."
        },
        ServiceDepositPaid: {
            sub: "DP.PORTFOLIO | Deposit Received. Booking Fully Secured!",
            txt: "We have successfully received your 50% deposit payment. Thank you!\n\nYour photoshoot date and time are officially locked in. See you at the agreed location! The remaining balance will be settled after the session."
        },
        ServiceFullyPaid: {
            sub: "DP.PORTFOLIO | Full Payment Received. Thank you!",
            txt: "We would like to confirm that full payment for our services has been successfully received.\n\nThank you sincerely for your trust and wonderful collaboration with DP.PORTFOLIO!"
        },
        ServiceCompleted: {
            sub: "DP.PORTFOLIO | Service Completed. Your photos are ready!",
            txt: "Your order is complete!\n\nAll selected photos and videos have been processed and uploaded to your personal Wfolio gallery. We invite you to view and download them in maximum quality."
        },
        ServiceCancelled: {
            sub: "DP.PORTFOLIO | Order Cancelled",
            txt: "This email is to inform you that your order has been cancelled.\n\nIf this was done in error or you have questions, please reply directly to this email."
        },
        ServiceStatusUpdate: {
            sub: "DP.PORTFOLIO | Order Status Updated",
            txt: "We would like to inform you that your order status has been updated in our system."
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
            notes: "Vision / Notes:"
        },
        gallery: {
            title: "Your photo gallery is ready",
            desc: "Click the button below to open your private Wfolio gallery and download your photos without compression:",
            btn: "Open Wfolio Gallery &rarr;",
            note: "You can download individual photos or the entire collection as a ZIP archive."
        },
        receipt: {
            title: "Official Receipt / Invoice",
            desc: "Your payment confirmation document is ready. Click the button below to download:",
            btn: "Download Receipt (PDF) &darr;"
        },
        tips: {
            title: "Helpful tips before your shoot:",
            tip1: "<b>Outfits:</b> Bring 1–2 coordinated outfits without large logos. Earthy, neutral, or pastel colors photograph best.",
            tip2: "<b>Punctuality:</b> Please arrive 5–10 minutes early so we can discuss the shoot and start on time.",
            tip3: "<b>Mindset:</b> Relax and have fun – we will guide your posing and capture your best natural angles."
        }
    },
    ru: {
        greeting: "Здравствуйте, {{name}}!",
        badgeConfirmed: "Подтверждено",
        badgePending: "Заявка Получена",
        badgeCompleted: "Галерея Готова",
        badgeCancelled: "Отменено",
        TFPNew: {
            sub: "DP.PORTFOLIO | Получена заявка на TFP фотосессию",
            txt: "Большое спасибо за вашу заявку и предложенную идею!\n\nМы получили вашу анкету. Доминик ознакомится с вашим профилем и свяжется с вами в течение 24–48 часов для согласования деталей."
        },
        TFPConfirmed: {
            sub: "DP.PORTFOLIO | Подтверждено: TFP Фотосессия в Каунасе",
            txt: "Нам очень понравилась ваша идея, и мы с радостью подтверждаем вашу TFP фотосессию!\n\nС нетерпением ждем совместной съемки. Детали встречи и полезные советы указаны ниже."
        },
        TFPRescheduled: {
            sub: "DP.PORTFOLIO | Обновлено время или место TFP фотосессии",
            txt: "Сообщаем, что время, дата или локация вашей TFP фотосессии были обновлены.\n\nПожалуйста, ознакомьтесь с обновленной информацией ниже. Если новое время вам не подходит, ответьте на это письмо."
        },
        TFPCancelled: {
            sub: "DP.PORTFOLIO | Отменено: TFP Фотосессия",
            txt: "К сожалению, ввиду непредвиденных обстоятельств мы вынуждены отменить запланированную TFP фотосессию.\n\nБлагодарим за проявленный интерес и надеемся на сотрудничество в будущем."
        },
        TFPCompleted: {
            sub: "DP.PORTFOLIO | Спасибо за съемку! Фотографии готовы",
            txt: "Огромное спасибо за отличную энергетику и позитив на фотосессии!\n\nВсе кадры отобраны, профессионально отретушированы и загружены в вашу персональную галерею Wfolio."
        },
        ServiceNew: {
            sub: "DP.PORTFOLIO | Заказ принят – Информация и реквизиты",
            txt: "Благодарим за выбор услуг DP.PORTFOLIO!\n\nВаш заказ успешно принят. Ниже представлены детали бронирования и реквизиты для оплаты. Мы скоро свяжемся с вами."
        },
        ServiceConfirmed: {
            sub: "DP.PORTFOLIO | Заказ подтвержден – Реквизиты для оплаты",
            txt: "Ваш заказ официально подтвержден!\n\nДля окончательного закрепления даты в нашем календаре внесите 50% аванса по указанным ниже реквизитам выбранного вами способа оплаты."
        },
        ServiceDepositPaid: {
            sub: "DP.PORTFOLIO | Аванс получен. Бронь подтверждена!",
            txt: "Мы успешно получили ваш аванс (50%). Спасибо!\n\nДата и время окончательно забронированы. До встречи на съемке! Остаток суммы оплачивается после проведения фотосессии."
        },
        ServiceFullyPaid: {
            sub: "DP.PORTFOLIO | Полная оплата получена. Спасибо!",
            txt: "Подтверждаем успешное получение полной оплаты за услуги.\n\nИскренне благодарим за сотрудничество и доверие к DP.PORTFOLIO!"
        },
        ServiceCompleted: {
            sub: "DP.PORTFOLIO | Заказ выполнен. Фотографии готовы!",
            txt: "Ваш заказ успешно выполнен!\n\nВсе фотографии и видеоматериалы готовы и загружены в вашу персональную галерею Wfolio. Приглашаем к просмотру и скачиванию."
        },
        ServiceCancelled: {
            sub: "DP.PORTFOLIO | Заказ отменен",
            txt: "Сообщаем, что ваш заказ был отменен.\n\nЕсли это произошло по ошибке или у вас есть вопросы, ответьте на это письмо."
        },
        ServiceStatusUpdate: {
            sub: "DP.PORTFOLIO | Статус заказа обновлен",
            txt: "Статус вашего заказа в системе DP.PORTFOLIO был обновлен."
        },
        labels: {
            date: "Дата и время:",
            loc: "Локация:",
            price: "Общая стоимость:",
            dep: "Аванс к оплате (50%):",
            rem: "Остаток после съемки:",
            srv: "Пакет услуг:",
            status: "Статус заказа:",
            payMethod: "Способ оплаты:",
            notes: "Пожелания / Идея:"
        },
        gallery: {
            title: "Ваша галерея готова к просмотру",
            desc: "Нажмите кнопку ниже, чтобы открыть персональную галерею Wfolio и скачать снимки в оригинальном качестве без сжатия:",
            btn: "Открыть галерею Wfolio &rarr;",
            note: "Вы можете скачать как отдельные фотографии, так и весь архив разом."
        },
        receipt: {
            title: "Официальный чек / Квитанция",
            desc: "Ваш платежный документ сформирован и готов к скачиванию. Нажмите кнопку ниже:",
            btn: "Скачать квитанцию (PDF) &darr;"
        },
        tips: {
            title: "Полезные советы перед фотосессией:",
            tip1: "<b>Одежда:</b> Возьмите 1–2 образа без крупных логотипов. Лучше всего смотрятся натуральные, пастельные и земляные оттенки.",
            tip2: "<b>Время:</b> Пожалуйста, приходите за 5–10 минут до начала, чтобы мы могли спокойно начать съемку.",
            tip3: "<b>Настрой:</b> Расслабьтесь и будьте собой — мы поможем подобрать удачные позы и ракурсы."
        }
    }
};

export function getDefaultContent(templateType, lang, data = {}) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang];
    const template = t[templateType] || t.ServiceStatusUpdate;

    const subject = template.sub;
    const clientName = data.name || data.clientName || '';
    const greeting = t.greeting.replace('{{name}}', clientName ? clientName : (safeLang === 'en' ? 'there' : (safeLang === 'ru' ? 'друг' : 'kliente')));
    const text = template.txt;

    let boxHtml = '';

    // If it's a financial service request or has price data
    if (data.finalPrice !== undefined && data.finalPrice !== null && data.finalPrice !== '') {
        const finalPriceFormatted = Number(data.finalPrice).toFixed(2);
        const depositFormatted = Number(data.depositAmount || (data.finalPrice / 2)).toFixed(2);
        const remainingFormatted = Number(data.remainingAmount || (data.finalPrice - (data.depositAmount || (data.finalPrice / 2)))).toFixed(2);
        const payMethod = data.paymentMethod || 'Bank Transfer';

        boxHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 22px 24px;">
                        <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 14px;">
                            ${safeLang === 'en' ? 'Order Summary' : (safeLang === 'ru' ? 'Детали заказа' : 'Užsakymo Suvestinė')}
                        </div>
                        <table role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                            ${data.serviceName ? `
                            <tr>
                                <td style="width: 150px; color: #607272; font-size: 13px;">${t.labels.srv}</td>
                                <td><b>${data.serviceName}</b></td>
                            </tr>` : ''}
                            ${data.date_time ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.date}</td>
                                <td><b>${data.date_time}</b></td>
                            </tr>` : ''}
                            ${data.location ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.loc}</td>
                                <td><b>${data.location}</b></td>
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
                                <td><span style="background-color: #EDF2F1; padding: 2px 8px; border-radius: 3px; font-size: 13px; font-weight: 600; color: #113939;">${payMethod}</span></td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;

        if (templateType === 'ServiceConfirmed' || templateType === 'ServiceNew' || templateType === 'ServiceStatusUpdate') {
            boxHtml += getPaymentDetailsHtml(payMethod, depositFormatted, clientName);
            boxHtml += getPreparationTipsHtml(safeLang);
        } else if (templateType === 'ServiceDepositPaid') {
            boxHtml += getPreparationTipsHtml(safeLang);
        }
    } else if (data.date_time || data.location) {
        // TFP or simple appointment
        boxHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 22px 24px;">
                        <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 14px;">
                            ${safeLang === 'en' ? 'Photoshoot Session Details' : (safeLang === 'ru' ? 'Детали фотосессии' : 'Fotosesijos Detalės')}
                        </div>
                        <table role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; color: #1A2B2B;">
                            ${data.date_time ? `
                            <tr>
                                <td style="width: 140px; color: #607272; font-size: 13px;">${t.labels.date}</td>
                                <td><b>${data.date_time}</b></td>
                            </tr>` : ''}
                            ${data.location ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.loc}</td>
                                <td><b>${data.location}</b></td>
                            </tr>` : ''}
                            ${data.idea ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.notes}</td>
                                <td><em>${data.idea}</em></td>
                            </tr>` : ''}
                            ${data.status ? `
                            <tr>
                                <td style="color: #607272; font-size: 13px;">${t.labels.status}</td>
                                <td><b style="color: #113939; text-transform: uppercase;">${data.status}</b></td>
                            </tr>` : ''}
                        </table>
                    </td>
                </tr>
            </table>
        `;

        if (templateType === 'TFPConfirmed' || templateType === 'TFPRescheduled') {
            boxHtml += getPreparationTipsHtml(safeLang);
        }
    } else if (data.status) {
        boxHtml = `
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 20px 0; background-color: #FBF9F6; border: 1px solid #EAE6DF; border-left: 4px solid #113939; border-radius: 4px;">
                <tr>
                    <td style="padding: 18px 22px; font-size: 15px; color: #1A2B2B;">
                        <b>${t.labels.status}</b> <span style="color: #113939; font-weight: bold; text-transform: uppercase; margin-left: 8px;">${data.status}</span>
                    </td>
                </tr>
            </table>
        `;
    }

    return { subject, greeting, text, boxHtml };
}

export function getGalleryHtml(lang, url) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].gallery;

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; background: linear-gradient(135deg, #113939 0%, #1c4d4d 100%); border-radius: 6px; box-shadow: 0 8px 25px rgba(17,57,57,0.18);">
            <tr>
                <td align="center" style="padding: 34px 25px; text-align: center;">
                    <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 18px; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; font-weight: 600; margin-bottom: 8px;">
                        ${t.title}
                    </div>
                    <p style="margin: 0 0 22px 0; color: #C2D6D4; font-size: 14px; line-height: 1.6; max-width: 460px;">
                        ${t.desc}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 0 auto 16px auto;">
                        <tr>
                            <td align="center" style="background-color: #FFFFFF; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
                                <a href="${url}" target="_blank" style="display: inline-block; padding: 15px 38px; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #113939; text-decoration: none;">
                                    ${t.btn}
                                </a>
                            </td>
                        </tr>
                    </table>
                    <div style="font-size: 12px; color: #A2BFBD; font-style: italic;">
                        ${t.note}
                    </div>
                </td>
            </tr>
        </table>
    `;
}

export function getReceiptHtml(lang, url) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].receipt;

    return `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 25px 0; background-color: #F7FAF9; border: 2px dashed #2A5C5C; border-radius: 6px;">
            <tr>
                <td align="center" style="padding: 26px 22px; text-align: center;">
                    <div style="font-family: 'Josefin Sans', Arial, sans-serif; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; color: #113939; font-weight: 700; margin-bottom: 6px;">
                        ${t.title}
                    </div>
                    <p style="margin: 0 0 18px 0; font-size: 13px; color: #607272; line-height: 1.6;">
                        ${t.desc}
                    </p>
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td align="center" style="background-color: #2A5C5C; border-radius: 4px; box-shadow: 0 4px 12px rgba(42,92,92,0.2);">
                                <a href="${url}" target="_blank" style="display: inline-block; padding: 12px 30px; font-family: 'Josefin Sans', Arial, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #FFFFFF; text-decoration: none;">
                                    ${t.btn}
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    `;
}

export function buildFinalHtml(greeting, text, boxHtml = '', galleryHtml = '', receiptHtml = '') {
    const formattedText = (text || '').replace(/\n/g, '<br>');

    return `${emailWrapperStart}
        <h2 style="font-family: 'Josefin Sans', Arial, sans-serif; color: #113939; font-size: 24px; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 16px 0;">
            ${greeting}
        </h2>
        <div style="color: #2D3748; font-size: 15px; line-height: 1.75; margin-bottom: 22px;">
            ${formattedText}
        </div>
        ${boxHtml || ''}
        ${receiptHtml || ''}
        ${galleryHtml || ''}
    ${emailWrapperEnd}`;
}

export function buildEmail(templateType, lang, data = {}) {
    const typeKey = templateType === 'New' ? 'TFPNew' : templateType;
    const { subject, greeting, text, boxHtml } = getDefaultContent(typeKey, lang, data);
    const html = buildFinalHtml(greeting, text, boxHtml, '', '');
    return { subject, html };
}
