const baseStyle = `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;`;
const footerHtml = `
    <br>
    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
        <b>DP.PORTFOLIO</b><br>
        Dominik Šuškevič<br>
        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
    </p>
</div>`;

export const templates = {
    lt: {
        New: {
            subject: "DP.PORTFOLIO | TFP Užklausa gauta",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Gavome jūsų TFP fotosesijos užklausą. Artimiausiu metu ją peržiūrėsime ir susisieksime su jumis.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Detalės:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Vieta:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Idėja:</b> {{idea}}</p>
                </div>
                ${footerHtml}`
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Fotosesija patvirtinta!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Puikios naujienos! Jūsų TFP fotosesijos idėja patvirtinta.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Susitinkame:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p>Iki greito!</p>
                ${footerHtml}`
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | TFP Fotosesijos laikas pakeistas",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Jūsų TFP fotosesijos laikas arba vieta buvo atnaujinta.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Nauja informacija:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p>Jei turite klausimų, susisiekite.</p>
                ${footerHtml}`
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Fotosesija atšaukta",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Atsiprašome, bet šiuo metu jūsų TFP fotosesija yra atšaukta. Susisieksime su jumis, jei atsiras laisvų vietų ateityje.</p>
                <p>Ačiū už jūsų supratingumą.</p>
                ${footerHtml}`
        },
        Completed: {
            subject: "DP.PORTFOLIO | Ačiū už fotosesiją!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Ačiū už puikią TFP fotosesiją! Nuotraukas atsiųsime, kai tik jos bus paruoštos.</p>
                <p>Iki kitų kartų!</p>
                ${footerHtml}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Paslaugos užklausa gauta",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Gavome jūsų užklausą paslaugai: <strong>{{serviceName}}</strong>.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 5px 0;"><b>Bendra kaina:</b> {{finalPrice}} €</p>
                    <p style="margin: 0 0 5px 0;"><b>Avansas (50%):</b> {{depositAmount}} €</p>
                    <p style="margin: 0 0 5px 0;"><b>Likutis po atlikimo:</b> {{remainingAmount}} €</p>
                    <p style="margin: 0;"><b>Pasirinktas apmokėjimo būdas:</b> {{paymentMethod}}</p>
                </div>
                <p>Jei pasirinkote bankinį pavedimą, rekvizitai: <b>{{bankDetails}}</b></p>
                <p>Jei pasirinkote PayPal: <b>{{paypalEmail}}</b></p>
                <p>Susisieksime su jumis netrukus, kad patvirtintume detales. Avansą prašome pervesti tik po galutinio patvirtinimo.</p>
                ${footerHtml}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Jūsų užsakymo statusas atnaujintas",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                <p>Jūsų užsakymo (<strong>{{serviceName}}</strong>) statusas pasikeitė į: <strong>{{status}}</strong>.</p>
                <p>Jei turite klausimų, susisiekite su mumis atsakydami į šį laišką.</p>
                ${footerHtml}`
        }
    },
    en: {
        New: {
            subject: "DP.PORTFOLIO | TFP Request Received",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>We have received your TFP photoshoot request. We will review it and get back to you shortly.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Location:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Idea:</b> {{idea}}</p>
                </div>
                ${footerHtml}`
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Confirmed!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>Great news! Your TFP photoshoot idea has been confirmed.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Meeting details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p>See you soon!</p>
                ${footerHtml}`
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Rescheduled",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>Your TFP photoshoot time or location has been updated.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>New details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p>If you have any questions, feel free to contact me.</p>
                ${footerHtml}`
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Cancelled",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>We apologize, but your TFP photoshoot has been cancelled at this time. We will let you know if any spots open up in the future.</p>
                <p>Thank you for understanding.</p>
                ${footerHtml}`
        },
        Completed: {
            subject: "DP.PORTFOLIO | Thank you for the photoshoot!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>Thank you for a great TFP photoshoot! The photos will be sent to you as soon as they are ready.</p>
                <p>Until next time!</p>
                ${footerHtml}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Service Request Received",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>We have received your request for: <strong>{{serviceName}}</strong>.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 5px 0;"><b>Total Price:</b> €{{finalPrice}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Deposit (50%):</b> €{{depositAmount}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Remaining Balance:</b> €{{remainingAmount}}</p>
                    <p style="margin: 0;"><b>Selected Payment Method:</b> {{paymentMethod}}</p>
                </div>
                <p>If Bank Transfer: <b>{{bankDetails}}</b></p>
                <p>If PayPal: <b>{{paypalEmail}}</b></p>
                <p>We will contact you shortly to confirm the details. Please transfer the deposit only after final confirmation.</p>
                ${footerHtml}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Order Status Updated",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello {{name}},</h2>
                <p>Your order (<strong>{{serviceName}}</strong>) status has been updated to: <strong>{{status}}</strong>.</p>
                <p>If you have any questions, please reply to this email.</p>
                ${footerHtml}`
        }
    },
    ru: {
        New: {
            subject: "DP.PORTFOLIO | Заявка TFP получена",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Мы получили вашу заявку на TFP фотосессию. В ближайшее время мы её рассмотрим и свяжемся с вами.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Детали:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Место:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Идея:</b> {{idea}}</p>
                </div>
                ${footerHtml}`
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Фотосессия подтверждена!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Отличные новости! Ваша идея для TFP фотосессии подтверждена.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Встречаемся:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p>До скорой встречи!</p>
                ${footerHtml}`
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | Время TFP фотосессии изменено",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Время или место вашей TFP фотосессии было обновлено.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 10px 0;"><b>Новая информация:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p>Если у вас есть вопросы, свяжитесь со мной.</p>
                ${footerHtml}`
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Фотосессия отменена",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Сожалеем, но ваша TFP фотосессия на данный момент отменена. Мы свяжемся с вами, если появятся свободные места в будущем.</p>
                <p>Спасибо за понимание.</p>
                ${footerHtml}`
        },
        Completed: {
            subject: "DP.PORTFOLIO | Спасибо за фотосессию!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Спасибо за отличную TFP фотосессию! Фотографии будут отправлены вам, как только они будут готовы.</p>
                <p>До новых встреч!</p>
                ${footerHtml}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Заявка на услуги получена",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Мы получили вашу заявку на услугу: <strong>{{serviceName}}</strong>.</p>
                <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                    <p style="margin: 0 0 5px 0;"><b>Общая стоимость:</b> €{{finalPrice}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Аванс (50%):</b> €{{depositAmount}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Остаток:</b> €{{remainingAmount}}</p>
                    <p style="margin: 0;"><b>Способ оплаты:</b> {{paymentMethod}}</p>
                </div>
                <p>Реквизиты банка: <b>{{bankDetails}}</b></p>
                <p>PayPal: <b>{{paypalEmail}}</b></p>
                <p>Мы свяжемся с вами в ближайшее время для подтверждения. Пожалуйста, вносите аванс только после окончательного подтверждения.</p>
                ${footerHtml}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Статус заказа обновлен",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                <p>Статус вашего заказа (<strong>{{serviceName}}</strong>) изменен на: <strong>{{status}}</strong>.</p>
                <p>Если у вас есть вопросы, ответьте на это письмо.</p>
                ${footerHtml}`
        }
    }
};

export function buildEmail(templateType, lang, data) {
    const safeLang = templates[lang] ? lang : 'en';
    let subject = templates[safeLang][templateType].subject;
    let html = templates[safeLang][templateType].html;

    for (const key in data) {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key] || '');
        subject = subject.replace(regex, data[key] || '');
    }

    return { subject, html };
}
