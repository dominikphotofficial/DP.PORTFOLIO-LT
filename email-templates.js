export const templates = {
    lt: {
        New: {
            subject: "DP.PORTFOLIO | TFP Užklausa gauta",
            html: "<p>Sveiki, {{name}},</p><p>Gavome jūsų TFP fotosesijos užklausą. Artimiausiu metu ją peržiūrėsime ir susisieksime su jumis.</p><p><b>Detalės:</b><br>Data ir laikas: {{date_time}}<br>Vieta: {{location}}<br>Idėja: {{idea}}</p><p>Pagarbiai,<br>Dominik Šuškevič</p>"
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Fotosesija patvirtinta!",
            html: "<p>Sveiki, {{name}},</p><p>Puikios naujienos! Jūsų TFP fotosesijos idėja patvirtinta.</p><p><b>Susitinkame:</b><br>Data ir laikas: {{date_time}}<br>Vieta: {{location}}</p><p>Iki greito!</p>"
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | TFP Fotosesijos laikas pakeistas",
            html: "<p>Sveiki, {{name}},</p><p>Jūsų TFP fotosesijos laikas arba vieta buvo atnaujinta.</p><p><b>Nauja informacija:</b><br>Data ir laikas: {{date_time}}<br>Vieta: {{location}}</p><p>Jei turite klausimų, susisiekite.</p>"
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Fotosesija atšaukta",
            html: "<p>Sveiki, {{name}},</p><p>Atsiprašome, bet šiuo metu jūsų TFP fotosesija yra atšaukta. Susisieksime su jumis, jei atsiras laisvų vietų ateityje.</p><p>Ačiū už jūsų supratingumą.</p>"
        },
        Completed: {
            subject: "DP.PORTFOLIO | Ačiū už fotosesiją!",
            html: "<p>Sveiki, {{name}},</p><p>Ačiū už puikią TFP fotosesiją! Nuotraukas atsiųsime, kai tik jos bus paruoštos.</p><p>Iki kitų kartų!</p>"
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Paslaugos užklausa gauta",
            html: `
                <div style="font-family: sans-serif; color: #1A2B2B; line-height: 1.6;">
                    <h2>Sveiki, {{name}},</h2>
                    <p>Gavome jūsų užklausą paslaugai: <strong>{{serviceName}}</strong>.</p>
                    <div style="background: #FBF9F6; padding: 15px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p><b>Bendra kaina:</b> {{finalPrice}} €</p>
                        <p><b>Avansas (50%):</b> {{depositAmount}} €</p>
                        <p><b>Likutis po atlikimo:</b> {{remainingAmount}} €</p>
                        <p><b>Pasirinktas apmokėjimo būdas:</b> {{paymentMethod}}</p>
                    </div>
                    <p>Jei pasirinkote bankinį pavedimą, rekvizitai: {{bankDetails}}</p>
                    <p>Jei pasirinkote PayPal: {{paypalEmail}}</p>
                    <p>Susisieksime su jumis netrukus, kad patvirtintume detales. Avansą prašome pervesti tik po galutinio patvirtinimo.</p>
                    <p>Pagarbiai,<br>DP.PORTFOLIO</p>
                </div>
            `
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Jūsų užsakymo statusas atnaujintas",
            html: `
                <div style="font-family: sans-serif; color: #1A2B2B; line-height: 1.6;">
                    <h2>Sveiki, {{name}},</h2>
                    <p>Jūsų užsakymo ({{serviceName}}) statusas pasikeitė į: <strong>{{status}}</strong>.</p>
                    <p>Jei turite klausimų, susisiekite su mumis atsakydami į šį laišką.</p>
                    <p>Pagarbiai,<br>DP.PORTFOLIO</p>
                </div>
            `
        }
    },
    en: {
        New: {
            subject: "DP.PORTFOLIO | TFP Request Received",
            html: "<p>Hello {{name}},</p><p>We have received your TFP photoshoot request. We will review it and get back to you shortly.</p><p><b>Details:</b><br>Date & Time: {{date_time}}<br>Location: {{location}}<br>Idea: {{idea}}</p><p>Best regards,<br>Dominik Šuškevič</p>"
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Confirmed!",
            html: "<p>Hello {{name}},</p><p>Great news! Your TFP photoshoot idea has been confirmed.</p><p><b>Meeting details:</b><br>Date & Time: {{date_time}}<br>Location: {{location}}</p><p>See you soon!</p>"
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Rescheduled",
            html: "<p>Hello {{name}},</p><p>Your TFP photoshoot time or location has been updated.</p><p><b>New details:</b><br>Date & Time: {{date_time}}<br>Location: {{location}}</p><p>If you have any questions, feel free to contact me.</p>"
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Cancelled",
            html: "<p>Hello {{name}},</p><p>We apologize, but your TFP photoshoot has been cancelled at this time. We will let you know if any spots open up in the future.</p><p>Thank you for understanding.</p>"
        },
        Completed: {
            subject: "DP.PORTFOLIO | Thank you for the photoshoot!",
            html: "<p>Hello {{name}},</p><p>Thank you for a great TFP photoshoot! The photos will be sent to you as soon as they are ready.</p><p>Until next time!</p>"
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Service Request Received",
            html: `
                <div style="font-family: sans-serif; color: #1A2B2B; line-height: 1.6;">
                    <h2>Hello {{name}},</h2>
                    <p>We have received your request for: <strong>{{serviceName}}</strong>.</p>
                    <div style="background: #FBF9F6; padding: 15px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p><b>Total Price:</b> €{{finalPrice}}</p>
                        <p><b>Deposit (50%):</b> €{{depositAmount}}</p>
                        <p><b>Remaining Balance:</b> €{{remainingAmount}}</p>
                        <p><b>Selected Payment Method:</b> {{paymentMethod}}</p>
                    </div>
                    <p>If Bank Transfer: {{bankDetails}}</p>
                    <p>If PayPal: {{paypalEmail}}</p>
                    <p>We will contact you shortly to confirm the details. Please transfer the deposit only after final confirmation.</p>
                    <p>Best regards,<br>DP.PORTFOLIO</p>
                </div>
            `
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Order Status Updated",
            html: `
                <div style="font-family: sans-serif; color: #1A2B2B; line-height: 1.6;">
                    <h2>Hello {{name}},</h2>
                    <p>Your order ({{serviceName}}) status has been updated to: <strong>{{status}}</strong>.</p>
                    <p>If you have any questions, please reply to this email.</p>
                    <p>Best regards,<br>DP.PORTFOLIO</p>
                </div>
            `
        }
    },
    ru: {
        New: {
            subject: "DP.PORTFOLIO | Заявка TFP получена",
            html: "<p>Здравствуйте, {{name}},</p><p>Мы получили вашу заявку на TFP фотосессию. В ближайшее время мы её рассмотрим и свяжемся с вами.</p><p><b>Детали:</b><br>Дата и время: {{date_time}}<br>Место: {{location}}<br>Идея: {{idea}}</p><p>С уважением,<br>Dominik Šuškevič</p>"
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Фотосессия подтверждена!",
            html: "<p>Здравствуйте, {{name}},</p><p>Отличные новости! Ваша идея для TFP фотосессии подтверждена.</p><p><b>Встречаемся:</b><br>Дата и время: {{date_time}}<br>Место: {{location}}</p><p>До скорой встречи!</p>"
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | Время TFP фотосессии изменено",
            html: "<p>Здравствуйте, {{name}},</p><p>Время или место вашей TFP фотосессии было обновлено.</p><p><b>Новая информация:</b><br>Дата и время: {{date_time}}<br>Место: {{location}}</p><p>Если у вас есть вопросы, свяжитесь со мной.</p>"
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Фотосессия отменена",
            html: "<p>Здравствуйте, {{name}},</p><p>Сожалеем, но ваша TFP фотосессия на данный момент отменена. Мы свяжемся с вами, если появятся свободные места в будущем.</p><p>Спасибо за понимание.</p>"
        },
        Completed: {
            subject: "DP.PORTFOLIO | Спасибо за фотосессию!",
            html: "<p>Здравствуйте, {{name}},</p><p>Спасибо за отличную TFP фотосессию! Фотографии будут отправлены вам, как только они будут готовы.</p><p>До новых встреч!</p>"
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Заявка на услуги получена",
            html: `
                <div style="font-family: sans-serif; color: #1A2B2B; line-height: 1.6;">
                    <h2>Здравствуйте, {{name}},</h2>
                    <p>Мы получили вашу заявку на услугу: <strong>{{serviceName}}</strong>.</p>
                    <div style="background: #FBF9F6; padding: 15px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p><b>Общая стоимость:</b> €{{finalPrice}}</p>
                        <p><b>Аванс (50%):</b> €{{depositAmount}}</p>
                        <p><b>Остаток:</b> €{{remainingAmount}}</p>
                        <p><b>Способ оплаты:</b> {{paymentMethod}}</p>
                    </div>
                    <p>Реквизиты банка: {{bankDetails}}</p>
                    <p>PayPal: {{paypalEmail}}</p>
                    <p>Мы свяжемся с вами в ближайшее время для подтверждения. Пожалуйста, вносите аванс только после окончательного подтверждения.</p>
                    <p>С уважением,<br>DP.PORTFOLIO</p>
                </div>
            `
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Статус заказа обновлен",
            html: `
                <div style="font-family: sans-serif; color: #1A2B2B; line-height: 1.6;">
                    <h2>Здравствуйте, {{name}},</h2>
                    <p>Статус вашего заказа ({{serviceName}}) изменен на: <strong>{{status}}</strong>.</p>
                    <p>Если у вас есть вопросы, ответьте на это письмо.</p>
                    <p>С уважением,<br>DP.PORTFOLIO</p>
                </div>
            `
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
