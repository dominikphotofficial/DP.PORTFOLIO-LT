const emailWrapperStart = `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 30px 20px; background-color: #ffffff;">
`;

const boxStyle = `border: 1px solid #E5ECE9; padding: 25px; margin: 25px 0; border-radius: 4px;`;

const emailWrapperEnd = `
    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 40px 0 20px 0;">
    <p style="font-size: 0.85em; color: #888888; margin: 0; line-height: 1.6;">
        <b>DP.PORTFOLIO</b><br>
        Dominik Šuškevič<br>
        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
    </p>
</div>
`;

export const templates = {
    lt: {
        New: {
            subject: "DP.PORTFOLIO | Nauja TFP užklausa",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}}!</h2>
                <p style="font-size: 16px;">Nuoširdžiai dėkojame, kad pasidalinote savo kūrybine vizija. Sėkmingai gavome jūsų <b>TFP fotosesijos</b> užklausą.</p>
                <p style="font-size: 16px;">Artimiausiu metu atidžiai peržiūrėsime jūsų idėją ir susisieksime su jumis.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Užklausos detalės:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Vieta:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Idėja:</b> {{idea}}</p>
                </div>
                <p style="font-size: 16px;">Jei turite papildomų klausimų, drąsiai atsakykite į šį laišką. Gražios dienos!</p>
            ${emailWrapperEnd}`
        },
        TFPConfirmed: {
            subject: "DP.PORTFOLIO | Patvirtinta: TFP Fotosesija",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Puikios naujienos, {{name}}!</h2>
                <p style="font-size: 16px;">Mums labai patiko jūsų idėja, todėl su džiaugsmu <b>patvirtiname</b> jūsų TFP fotosesiją.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Susitikimo informacija:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">Nekantraujame pradėti kurti kartu! Iki greito.</p>
            ${emailWrapperEnd}`
        },
        TFPRescheduled: {
            subject: "DP.PORTFOLIO | Atnaujinta: TFP Fotosesija",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Norime informuoti, kad jūsų TFP fotosesijos detalės buvo atnaujintos.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Nauja informacija:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">Jei šis laikas jums netinka, prašome atsakyti į šį laišką. Ačiū už jūsų lankstumą!</p>
            ${emailWrapperEnd}`
        },
        TFPCancelled: {
            subject: "DP.PORTFOLIO | Atšaukta: TFP Fotosesija",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Apgailestaujame, tačiau dėl nenumatytų aplinkybių turime <b>atšaukti</b> jūsų TFP fotosesiją.</p>
                <p style="font-size: 16px;">Labai vertiname jūsų norą bendradarbiauti ir tikimės, kad ateityje turėsime progą sukurti kažką gražaus kartu.</p>
            ${emailWrapperEnd}`
        },
        TFPCompleted: {
            subject: "DP.PORTFOLIO | Ačiū už fotosesiją!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}}!</h2>
                <p style="font-size: 16px;">Didelis ačiū už jūsų laiką, pastangas ir puikią nuotaiką fotosesijos metu!</p>
                <p style="font-size: 16px;">Šiuo metu jau dirbame prie jūsų nuotraukų redagavimo. Kai tik jos bus paruoštos, atsiųsime jums nuorodą.</p>
                <p style="font-size: 16px;">Tikimės, kad rezultatas jums patiks!</p>
            ${emailWrapperEnd}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Užklausa gauta: {{serviceName}}",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}}!</h2>
                <p style="font-size: 16px;">Šis laiškas patvirtina, kad sėkmingai gavome jūsų užklausą paslaugai: <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Artimiausiu metu peržiūrėsime jūsų pageidavimus ir susisieksime dėl detalių patvirtinimo.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Preliminari informacija:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Bendra kaina:</b> {{finalPrice}} €</p>
                    <p style="margin: 0 0 8px 0;"><b>Avansas (50%):</b> {{depositAmount}} €</p>
                    <p style="margin: 0;"><b>Pasirinktas apmokėjimo būdas:</b> {{paymentMethod}}</p>
                </div>
                <p style="font-size: 16px; color: #d9534f;"><b>Svarbu:</b> Kol kas jokių mokėjimų atlikti nereikia. Laukite kito laiško su galutiniu patvirtinimu.</p>
            ${emailWrapperEnd}`
        },
        ServiceConfirmed: {
            subject: "DP.PORTFOLIO | Užsakymas patvirtintas. Reikalingas avansas",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Jūsų užsakymas (<strong>{{serviceName}}</strong>) yra <b>patvirtintas</b>!</p>
                <p style="font-size: 16px;">Norėdami galutinai rezervuoti datą ir laiką, prašome atlikti avansinį mokėjimą.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Užsakymo detalės:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Vieta:</b> {{location}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Bendra kaina:</b> {{finalPrice}} €</p>
                    <p style="margin: 0; font-weight: bold; color: #113939;">Mokėtinas avansas: {{depositAmount}} €</p>
                </div>
                <p style="font-size: 16px; margin-bottom: 10px;"><b>Apmokėjimo instrukcijos:</b></p>
                <p style="font-size: 16px; margin: 0 0 5px 0;">Bankinis pavedimas: <b>{{bankDetails}}</b></p>
                <p style="font-size: 16px; margin: 0 0 15px 0;">PayPal: <b>{{paypalEmail}}</b></p>
                <p style="font-size: 16px;">Atlikę mokėjimą, galite atsakyti į šį laišką. Gavę avansą, atsiųsime patvirtinimą.</p>
            ${emailWrapperEnd}`
        },
        ServiceDepositPaid: {
            subject: "DP.PORTFOLIO | Avansas gautas. Rezervacija patvirtinta!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Sėkmingai gavome jūsų avansinį mokėjimą ({{depositAmount}} €) už paslaugą <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Jūsų rezervacija yra pilnai patvirtinta. Susitiksime sutartu laiku!</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 8px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">Likutį ({{remainingAmount}} €) galėsite apmokėti po paslaugos atlikimo.</p>
            ${emailWrapperEnd}`
        },
        ServiceFullyPaid: {
            subject: "DP.PORTFOLIO | Pilnas apmokėjimas gautas",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Informuojame, kad sėkmingai gavome pilną apmokėjimą už paslaugą <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Nuoširdžiai dėkojame už bendradarbiavimą!</p>
            ${emailWrapperEnd}`
        },
        ServiceCompleted: {
            subject: "DP.PORTFOLIO | Paslauga atlikta. Ačiū!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Jūsų užsakymas (<strong>{{serviceName}}</strong>) yra sėkmingai atliktas!</p>
                <p style="font-size: 16px;">Ačiū, kad pasirinkote DP.PORTFOLIO. Tikimės, kad rezultatas jums patiko ir lauksime sugrįžtant ateityje.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Dovana jums:</b></p>
                    <p style="margin: 0;">Kito užsakymo metu panaudokite kodą <b>DP10</b> ir gaukite 10% nuolaidą!</p>
                </div>
            ${emailWrapperEnd}`
        },
        ServiceCancelled: {
            subject: "DP.PORTFOLIO | Užsakymas atšauktas",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Informuojame, kad jūsų užsakymas (<strong>{{serviceName}}</strong>) buvo atšauktas.</p>
                <p style="font-size: 16px;">Jei tai įvyko per klaidą arba turite klausimų, prašome susisiekti su mumis.</p>
            ${emailWrapperEnd}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Užsakymo statusas: {{status}}",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Sveiki, {{name}},</h2>
                <p style="font-size: 16px;">Informuojame, kad jūsų užsakymo (<strong>{{serviceName}}</strong>) statusas buvo atnaujintas.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0; font-size: 1.1em;"><b>Naujas statusas:</b> <span style="color: #113939; font-weight: bold; text-transform: uppercase;">{{status}}</span></p>
                </div>
                <p style="font-size: 16px;">Jei turite klausimų, tiesiog atsakykite į šį laišką.</p>
            ${emailWrapperEnd}`
        }
    },
    en: {
        New: {
            subject: "DP.PORTFOLIO | New TFP Request",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}}!</h2>
                <p style="font-size: 16px;">Thank you for sharing your creative vision. We have successfully received your <b>TFP photoshoot</b> request.</p>
                <p style="font-size: 16px;">We will carefully review your idea and get back to you shortly.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Request Details:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Location:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Idea:</b> {{idea}}</p>
                </div>
                <p style="font-size: 16px;">If you have any additional questions, feel free to reply to this email. Have a great day!</p>
            ${emailWrapperEnd}`
        },
        TFPConfirmed: {
            subject: "DP.PORTFOLIO | Confirmed: TFP Photoshoot",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Great news, {{name}}!</h2>
                <p style="font-size: 16px;">We absolutely loved your idea and are thrilled to <b>confirm</b> your TFP photoshoot.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Meeting Details:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">We can't wait to start creating together! See you soon.</p>
            ${emailWrapperEnd}`
        },
        TFPRescheduled: {
            subject: "DP.PORTFOLIO | Rescheduled: TFP Photoshoot",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">We wanted to let you know that your TFP photoshoot details have been updated.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>New Details:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">If this new time doesn't work for you, please reply to this email. Thank you for your flexibility!</p>
            ${emailWrapperEnd}`
        },
        TFPCancelled: {
            subject: "DP.PORTFOLIO | Cancelled: TFP Photoshoot",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">We sincerely apologize, but due to unforeseen circumstances, we have to <b>cancel</b> your TFP photoshoot.</p>
                <p style="font-size: 16px;">We truly appreciate your interest and hope we will have the opportunity to create something beautiful together in the future.</p>
            ${emailWrapperEnd}`
        },
        TFPCompleted: {
            subject: "DP.PORTFOLIO | Thank you for the photoshoot!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}}!</h2>
                <p style="font-size: 16px;">A huge thank you for your time, effort, and great energy during the photoshoot!</p>
                <p style="font-size: 16px;">We are currently working on editing your photos. As soon as they are ready, we will send you a link.</p>
                <p style="font-size: 16px;">We hope you will love the final result!</p>
            ${emailWrapperEnd}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Request Received: {{serviceName}}",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}}!</h2>
                <p style="font-size: 16px;">This email confirms that we have successfully received your request for: <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">We will review your information shortly and contact you to confirm the details.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Preliminary Details:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Total Price:</b> €{{finalPrice}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Deposit (50%):</b> €{{depositAmount}}</p>
                    <p style="margin: 0;"><b>Selected Payment Method:</b> {{paymentMethod}}</p>
                </div>
                <p style="font-size: 16px; color: #d9534f;"><b>Important:</b> No payment is required at this stage. Please wait for our final confirmation email.</p>
            ${emailWrapperEnd}`
        },
        ServiceConfirmed: {
            subject: "DP.PORTFOLIO | Order Confirmed. Deposit Required",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">Your order (<strong>{{serviceName}}</strong>) is <b>confirmed</b>!</p>
                <p style="font-size: 16px;">To fully secure your date and time, please proceed with the deposit payment.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Order Details:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Location:</b> {{location}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Total Price:</b> €{{finalPrice}}</p>
                    <p style="margin: 0; font-weight: bold; color: #113939;">Deposit to pay: €{{depositAmount}}</p>
                </div>
                <p style="font-size: 16px; margin-bottom: 10px;"><b>Payment Instructions:</b></p>
                <p style="font-size: 16px; margin: 0 0 5px 0;">Bank Transfer: <b>{{bankDetails}}</b></p>
                <p style="font-size: 16px; margin: 0 0 15px 0;">PayPal: <b>{{paypalEmail}}</b></p>
                <p style="font-size: 16px;">Once the payment is made, you can reply to this email. We will send a confirmation upon receiving the deposit.</p>
            ${emailWrapperEnd}`
        },
        ServiceDepositPaid: {
            subject: "DP.PORTFOLIO | Deposit Received. Thank you!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">We have successfully received your deposit payment (€{{depositAmount}}) for <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Your booking is now fully confirmed. See you at the agreed time!</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 8px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">The remaining balance (€{{remainingAmount}}) can be paid after the service is completed.</p>
            ${emailWrapperEnd}`
        },
        ServiceFullyPaid: {
            subject: "DP.PORTFOLIO | Full Payment Received",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">We would like to inform you that we have successfully received the full payment for <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Thank you very much for your cooperation!</p>
            ${emailWrapperEnd}`
        },
        ServiceCompleted: {
            subject: "DP.PORTFOLIO | Service Completed. Thank you!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">Your order (<strong>{{serviceName}}</strong>) has been successfully completed!</p>
                <p style="font-size: 16px;">Thank you for choosing DP.PORTFOLIO. We hope you enjoyed the result.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>A gift for you:</b></p>
                    <p style="margin: 0;">Use the promo code <b>DP10</b> on your next order to get a 10% discount!</p>
                </div>
                <p style="font-size: 16px;">We look forward to working with you again in the future.</p>
            ${emailWrapperEnd}`
        },
        ServiceCancelled: {
            subject: "DP.PORTFOLIO | Order Cancelled",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">We would like to inform you that your order (<strong>{{serviceName}}</strong>) has been cancelled.</p>
                <p style="font-size: 16px;">If this was a mistake or if you have any questions, please contact us.</p>
            ${emailWrapperEnd}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Order Status: {{status}}",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Hello, {{name}},</h2>
                <p style="font-size: 16px;">We would like to inform you that the status of your order (<strong>{{serviceName}}</strong>) has been updated.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0; font-size: 1.1em;"><b>New Status:</b> <span style="color: #113939; font-weight: bold; text-transform: uppercase;">{{status}}</span></p>
                </div>
                <p style="font-size: 16px;">If you have any questions, simply reply to this email.</p>
            ${emailWrapperEnd}`
        }
    },
    ru: {
        New: {
            subject: "DP.PORTFOLIO | Новая TFP заявка",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}}!</h2>
                <p style="font-size: 16px;">Спасибо, что поделились своей творческой идеей. Мы успешно получили вашу заявку на <b>TFP фотосессию</b>.</p>
                <p style="font-size: 16px;">В ближайшее время мы внимательно изучим вашу идею и свяжемся с вами.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Детали заявки:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Место:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Идея:</b> {{idea}}</p>
                </div>
                <p style="font-size: 16px;">Если у вас есть дополнительные вопросы, смело пишите нам в ответ на это письмо. Хорошего дня!</p>
            ${emailWrapperEnd}`
        },
        TFPConfirmed: {
            subject: "DP.PORTFOLIO | Подтверждено: TFP Фотосессия",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Отличные новости, {{name}}!</h2>
                <p style="font-size: 16px;">Нам безумно понравилась ваша идея, и мы с радостью <b>подтверждаем</b> вашу TFP фотосессию.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Детали встречи:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">С нетерпением ждем начала совместного творчества! До скорой встречи.</p>
            ${emailWrapperEnd}`
        },
        TFPRescheduled: {
            subject: "DP.PORTFOLIO | Обновлено: TFP Фотосессия",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Хотим сообщить, что детали вашей TFP фотосессии были обновлены.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Новая информация:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">Если это новое время вам не подходит, пожалуйста, ответьте на это письмо. Спасибо за вашу гибкость!</p>
            ${emailWrapperEnd}`
        },
        TFPCancelled: {
            subject: "DP.PORTFOLIO | Отменено: TFP Фотосессия",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Приносим свои извинения, но из-за непредвиденных обстоятельств мы вынуждены <b>отменить</b> вашу TFP фотосессию.</p>
                <p style="font-size: 16px;">Мы очень ценим ваше желание сотрудничать и надеемся, что в будущем у нас появится возможность создать что-то красивое вместе.</p>
            ${emailWrapperEnd}`
        },
        TFPCompleted: {
            subject: "DP.PORTFOLIO | Спасибо за фотосессию!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}}!</h2>
                <p style="font-size: 16px;">Огромное спасибо за ваше время, старания и отличную атмосферу во время фотосессии!</p>
                <p style="font-size: 16px;">Сейчас мы уже работаем над обработкой ваших фотографий. Как только они будут готовы, мы пришлем вам ссылку.</p>
                <p style="font-size: 16px;">Надеемся, результат вам очень понравится!</p>
            ${emailWrapperEnd}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Заявка получена: {{serviceName}}",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}}!</h2>
                <p style="font-size: 16px;">Это письмо подтверждает, что мы успешно получили вашу заявку на услугу: <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">В ближайшее время мы изучим ваши пожелания и свяжемся с вами для подтверждения деталей.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Предварительная информация:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Общая стоимость:</b> €{{finalPrice}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Аванс (50%):</b> €{{depositAmount}}</p>
                    <p style="margin: 0;"><b>Способ оплаты:</b> {{paymentMethod}}</p>
                </div>
                <p style="font-size: 16px; color: #d9534f;"><b>Важно:</b> На данном этапе оплачивать ничего не нужно. Ожидайте письмо с окончательным подтверждением.</p>
            ${emailWrapperEnd}`
        },
        ServiceConfirmed: {
            subject: "DP.PORTFOLIO | Заказ подтвержден. Требуется аванс",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Ваш заказ (<strong>{{serviceName}}</strong>) <b>подтвержден</b>!</p>
                <p style="font-size: 16px;">Чтобы окончательно забронировать дату и время, пожалуйста, внесите аванс.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 15px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Детали заказа:</b></p>
                    <p style="margin: 0 0 8px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Место:</b> {{location}}</p>
                    <p style="margin: 0 0 8px 0;"><b>Общая стоимость:</b> €{{finalPrice}}</p>
                    <p style="margin: 0; font-weight: bold; color: #113939;">Сумма аванса: €{{depositAmount}}</p>
                </div>
                <p style="font-size: 16px; margin-bottom: 10px;"><b>Инструкции по оплате:</b></p>
                <p style="font-size: 16px; margin: 0 0 5px 0;">Реквизиты банка: <b>{{bankDetails}}</b></p>
                <p style="font-size: 16px; margin: 0 0 15px 0;">PayPal: <b>{{paypalEmail}}</b></p>
                <p style="font-size: 16px;">После оплаты вы можете ответить на это письмо. Как только мы получим аванс, мы пришлем подтверждение.</p>
            ${emailWrapperEnd}`
        },
        ServiceDepositPaid: {
            subject: "DP.PORTFOLIO | Аванс получен. Спасибо!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Мы успешно получили ваш аванс (€{{depositAmount}}) за услугу <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Ваше бронирование полностью подтверждено. До встречи в назначенное время!</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 8px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p style="font-size: 16px;">Остаток (€{{remainingAmount}}) можно будет оплатить после выполнения услуги.</p>
            ${emailWrapperEnd}`
        },
        ServiceFullyPaid: {
            subject: "DP.PORTFOLIO | Полная оплата получена",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Сообщаем, что мы успешно получили полную оплату за услугу <strong>{{serviceName}}</strong>.</p>
                <p style="font-size: 16px;">Огромное спасибо за сотрудничество!</p>
            ${emailWrapperEnd}`
        },
        ServiceCompleted: {
            subject: "DP.PORTFOLIO | Услуга выполнена. Спасибо!",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Ваш заказ (<strong>{{serviceName}}</strong>) успешно выполнен!</p>
                <p style="font-size: 16px;">Спасибо, что выбрали DP.PORTFOLIO. Надеемся, вам понравился результат.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Подарок для вас:</b></p>
                    <p style="margin: 0;">Используйте промокод <b>DP10</b> при следующем заказе и получите скидку 10%!</p>
                </div>
                <p style="font-size: 16px;">Будем рады поработать с вами снова.</p>
            ${emailWrapperEnd}`
        },
        ServiceCancelled: {
            subject: "DP.PORTFOLIO | Заказ отменен",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Сообщаем, что ваш заказ (<strong>{{serviceName}}</strong>) был отменен.</p>
                <p style="font-size: 16px;">Если это произошло по ошибке или у вас есть вопросы, пожалуйста, свяжитесь с нами.</p>
            ${emailWrapperEnd}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Статус заказа: {{status}}",
            html: `${emailWrapperStart}
                <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">Здравствуйте, {{name}},</h2>
                <p style="font-size: 16px;">Хотим сообщить, что статус вашего заказа (<strong>{{serviceName}}</strong>) был обновлен.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0; font-size: 1.1em;"><b>Новый статус:</b> <span style="color: #113939; font-weight: bold; text-transform: uppercase;">{{status}}</span></p>
                </div>
                <p style="font-size: 16px;">Если у вас есть вопросы, просто ответьте на это письмо.</p>
            ${emailWrapperEnd}`
        }
    }
};

export function buildEmail(templateType, lang, data) {
    const safeLang = templates[lang] ? lang : 'en';
    let subject = templates[safeLang][templateType] ? templates[safeLang][templateType].subject : templates[safeLang]['ServiceStatusUpdate'].subject;
    let html = templates[safeLang][templateType] ? templates[safeLang][templateType].html : templates[safeLang]['ServiceStatusUpdate'].html;

    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key] || '');
        subject = subject.replace(regex, data[key] || '');
    }

    return { subject, html };
}
