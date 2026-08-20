const baseStyle = `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;`;
const boxStyle = `background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0; border-radius: 0 4px 4px 0;`;
const footerHtml = `
    <br>
    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0; line-height: 1.5;">
        <b>DP.PORTFOLIO</b><br>
        Dominik Šuškevič<br>
        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
    </p>
</div>`;

export const templates = {
    lt: {
        New: {
            subject: "DP.PORTFOLIO | Nauja užklausa: TFP Fotosesija",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Sveiki, {{name}}!</h2>
                <p>Ačiū, kad pasidalinote savo kūrybine vizija. Sėkmingai gavome jūsų <b>TFP fotosesijos</b> užklausą.</p>
                <p>Artimiausiu metu atidžiai peržiūrėsime jūsų idėją ir susisieksime su jumis.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Užklausos detalės:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Vieta:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Idėja:</b> {{idea}}</p>
                </div>
                <p>Jei turite papildomų klausimų, drąsiai atsakykite į šį laišką.</p>
                ${footerHtml}`
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | Patvirtinta: TFP Fotosesija",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Puikios naujienos, {{name}}!</h2>
                <p>Mums labai patiko jūsų idėja, todėl su džiaugsmu <b>patvirtiname</b> jūsų TFP fotosesiją.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Susitikimo informacija:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p>Nekantraujame pradėti kurti kartu! Iki greito.</p>
                ${footerHtml}`
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | Atnaujinta: TFP Fotosesija",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Sveiki, {{name}},</h2>
                <p>Norime informuoti, kad jūsų TFP fotosesijos detalės buvo atnaujintos.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Nauja informacija:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                </div>
                <p>Jei šis laikas jums netinka, prašome atsakyti į šį laišką. Ačiū už jūsų lankstumą!</p>
                ${footerHtml}`
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | Atšaukta: TFP Fotosesija",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Sveiki, {{name}},</h2>
                <p>Apgailestaujame, tačiau dėl nenumatytų aplinkybių turime <b>atšaukti</b> jūsų TFP fotosesiją.</p>
                <p>Labai vertiname jūsų norą bendradarbiauti ir tikimės, kad ateityje turėsime progą sukurti kažką gražaus kartu.</p>
                ${footerHtml}`
        },
        Completed: {
            subject: "DP.PORTFOLIO | Ačiū už fotosesiją!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Sveiki, {{name}}!</h2>
                <p>Didelis ačiū už jūsų laiką, pastangas ir puikią nuotaiką fotosesijos metu!</p>
                <p>Šiuo metu jau dirbame prie jūsų nuotraukų redagavimo. Kai tik jos bus paruoštos, atsiųsime jums nuorodą.</p>
                <p>Tikimės, kad rezultatas jums patiks!</p>
                ${footerHtml}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Naujas užsakymas: {{serviceName}}",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Sveiki, {{name}}!</h2>
                <p>Ačiū, kad pasirinkote DP.PORTFOLIO. Sėkmingai gavome jūsų užklausą paslaugai: <strong>{{serviceName}}</strong>.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Užsakymo informacija:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Bendra kaina:</b> {{finalPrice}} €</p>
                    <p style="margin: 0 0 5px 0;"><b>Avansas (50%):</b> {{depositAmount}} €</p>
                    <p style="margin: 0 0 5px 0;"><b>Likutis po atlikimo:</b> {{remainingAmount}} €</p>
                    <p style="margin: 0;"><b>Apmokėjimo būdas:</b> {{paymentMethod}}</p>
                </div>
                <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Apmokėjimo instrukcijos:</b></p>
                <p style="margin: 0 0 5px 0;">Bankinis pavedimas: <b>{{bankDetails}}</b></p>
                <p style="margin: 0 0 15px 0;">PayPal: <b>{{paypalEmail}}</b></p>
                <p style="color: #d9534f; font-size: 0.9em;"><em>Svarbu: Avansą prašome pervesti tik po to, kai galutinai patvirtinsime jūsų užsakymą ir datą.</em></p>
                ${footerHtml}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Užsakymo statusas: {{status}}",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Sveiki, {{name}},</h2>
                <p>Informuojame, kad jūsų užsakymo (<strong>{{serviceName}}</strong>) statusas buvo atnaujintas.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0; font-size: 1.1em;"><b>Naujas statusas:</b> <span style="color: #2A5C5C; font-weight: bold; text-transform: uppercase;">{{status}}</span></p>
                </div>
                <p>Jei turite klausimų, tiesiog atsakykite į šį laišką. Ačiū, kad esate su mumis!</p>
                ${footerHtml}`
        }
    },
    en: {
        New: {
            subject: "DP.PORTFOLIO | New Request: TFP Photoshoot",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Hello, {{name}}!</h2>
                <p>Thank you for sharing your creative vision. We have successfully received your <b>TFP photoshoot</b> request.</p>
                <p>We will carefully review your idea and get back to you shortly.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Request Details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Location:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Idea:</b> {{idea}}</p>
                </div>
                <p>If you have any additional questions, feel free to reply to this email.</p>
                ${footerHtml}`
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | Confirmed: TFP Photoshoot",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Great news, {{name}}!</h2>
                <p>We absolutely loved your idea and are thrilled to <b>confirm</b> your TFP photoshoot.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Meeting Details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p>We can't wait to start creating together! See you soon.</p>
                ${footerHtml}`
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | Rescheduled: TFP Photoshoot",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Hello, {{name}},</h2>
                <p>We wanted to let you know that your TFP photoshoot details have been updated.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>New Details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                </div>
                <p>If this new time doesn't work for you, please reply to this email. Thank you for your flexibility!</p>
                ${footerHtml}`
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | Cancelled: TFP Photoshoot",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Hello, {{name}},</h2>
                <p>We sincerely apologize, but due to unforeseen circumstances, we have to <b>cancel</b> your TFP photoshoot.</p>
                <p>We truly appreciate your interest and hope we will have the opportunity to create something beautiful together in the future.</p>
                ${footerHtml}`
        },
        Completed: {
            subject: "DP.PORTFOLIO | Thank you for the photoshoot!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Hello, {{name}}!</h2>
                <p>A huge thank you for your time, effort, and great energy during the photoshoot!</p>
                <p>We are currently working on editing your photos. As soon as they are ready, we will send you a link.</p>
                <p>We hope you will love the final result!</p>
                ${footerHtml}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | New Order: {{serviceName}}",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Hello, {{name}}!</h2>
                <p>Thank you for choosing DP.PORTFOLIO. We have successfully received your request for: <strong>{{serviceName}}</strong>.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Order Details:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Total Price:</b> €{{finalPrice}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Deposit (50%):</b> €{{depositAmount}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Remaining Balance:</b> €{{remainingAmount}}</p>
                    <p style="margin: 0;"><b>Payment Method:</b> {{paymentMethod}}</p>
                </div>
                <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Payment Instructions:</b></p>
                <p style="margin: 0 0 5px 0;">Bank Transfer: <b>{{bankDetails}}</b></p>
                <p style="margin: 0 0 15px 0;">PayPal: <b>{{paypalEmail}}</b></p>
                <p style="color: #d9534f; font-size: 0.9em;"><em>Important: Please transfer the deposit only after we have finally confirmed your order and date.</em></p>
                ${footerHtml}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Order Status: {{status}}",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Hello, {{name}},</h2>
                <p>We would like to inform you that the status of your order (<strong>{{serviceName}}</strong>) has been updated.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0; font-size: 1.1em;"><b>New Status:</b> <span style="color: #2A5C5C; font-weight: bold; text-transform: uppercase;">{{status}}</span></p>
                </div>
                <p>If you have any questions, simply reply to this email. Thank you for being with us!</p>
                ${footerHtml}`
        }
    },
    ru: {
        New: {
            subject: "DP.PORTFOLIO | Новая заявка: TFP Фотосессия",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Здравствуйте, {{name}}!</h2>
                <p>Спасибо, что поделились своей творческой идеей. Мы успешно получили вашу заявку на <b>TFP фотосессию</b>.</p>
                <p>В ближайшее время мы внимательно изучим вашу идею и свяжемся с вами.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Детали заявки:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Место:</b> {{location}}</p>
                    <p style="margin: 0;"><b>Идея:</b> {{idea}}</p>
                </div>
                <p>Если у вас есть дополнительные вопросы, смело пишите нам в ответ на это письмо.</p>
                ${footerHtml}`
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | Подтверждено: TFP Фотосессия",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Отличные новости, {{name}}!</h2>
                <p>Нам безумно понравилась ваша идея, и мы с радостью <b>подтверждаем</b> вашу TFP фотосессию.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Детали встречи:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p>С нетерпением ждем начала совместного творчества! До скорой встречи.</p>
                ${footerHtml}`
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | Обновлено: TFP Фотосессия",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Здравствуйте, {{name}},</h2>
                <p>Хотим сообщить, что детали вашей TFP фотосессии были обновлены.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Новая информация:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                    <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                </div>
                <p>Если это новое время вам не подходит, пожалуйста, ответьте на это письмо. Спасибо за вашу гибкость!</p>
                ${footerHtml}`
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | Отменено: TFP Фотосессия",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Здравствуйте, {{name}},</h2>
                <p>Приносим свои извинения, но из-за непредвиденных обстоятельств мы вынуждены <b>отменить</b> вашу TFP фотосессию.</p>
                <p>Мы очень ценим ваше желание сотрудничать и надеемся, что в будущем у нас появится возможность создать что-то красивое вместе.</p>
                ${footerHtml}`
        },
        Completed: {
            subject: "DP.PORTFOLIO | Спасибо за фотосессию!",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Здравствуйте, {{name}}!</h2>
                <p>Огромное спасибо за ваше время, старания и отличную атмосферу во время фотосессии!</p>
                <p>Сейчас мы уже работаем над обработкой ваших фотографий. Как только они будут готовы, мы пришлем вам ссылку.</p>
                <p>Надеемся, результат вам понравится!</p>
                ${footerHtml}`
        },
        ServiceNew: {
            subject: "DP.PORTFOLIO | Новый заказ: {{serviceName}}",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Здравствуйте, {{name}}!</h2>
                <p>Спасибо, что выбрали DP.PORTFOLIO. Мы успешно получили вашу заявку на услугу: <strong>{{serviceName}}</strong>.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Детали заказа:</b></p>
                    <p style="margin: 0 0 5px 0;"><b>Общая стоимость:</b> €{{finalPrice}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Аванс (50%):</b> €{{depositAmount}}</p>
                    <p style="margin: 0 0 5px 0;"><b>Остаток:</b> €{{remainingAmount}}</p>
                    <p style="margin: 0;"><b>Способ оплаты:</b> {{paymentMethod}}</p>
                </div>
                <p style="margin: 0 0 10px 0; color: #113939; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px;"><b>Инструкции по оплате:</b></p>
                <p style="margin: 0 0 5px 0;">Реквизиты банка: <b>{{bankDetails}}</b></p>
                <p style="margin: 0 0 15px 0;">PayPal: <b>{{paypalEmail}}</b></p>
                <p style="color: #d9534f; font-size: 0.9em;"><em>Важно: Пожалуйста, вносите аванс только после того, как мы окончательно подтвердим ваш заказ и дату.</em></p>
                ${footerHtml}`
        },
        ServiceStatusUpdate: {
            subject: "DP.PORTFOLIO | Статус заказа: {{status}}",
            html: `<div style="${baseStyle}">
                <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase; color: #113939;">Здравствуйте, {{name}},</h2>
                <p>Хотим сообщить, что статус вашего заказа (<strong>{{serviceName}}</strong>) был обновлен.</p>
                <div style="${boxStyle}">
                    <p style="margin: 0; font-size: 1.1em;"><b>Новый статус:</b> <span style="color: #2A5C5C; font-weight: bold; text-transform: uppercase;">{{status}}</span></p>
                </div>
                <p>Если у вас есть вопросы, просто ответьте на это письмо. Спасибо, что вы с нами!</p>
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
