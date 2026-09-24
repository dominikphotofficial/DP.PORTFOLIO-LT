const emailWrapperStart = `<div style="background-color: #FBF9F6; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 6px; border-top: 4px solid #113939; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">`;
const boxStyle = `border: 1px solid #E5ECE9; padding: 22px; margin: 22px 0; border-radius: 6px; background-color: #FBF9F6;`;
const emailWrapperEnd = `<hr style="border: none; border-top: 1px solid #E5ECE9; margin: 35px 0 25px 0;"><p style="font-size: 0.9em; color: #2A5C5C; margin: 0; line-height: 1.6;"><b>DP.PORTFOLIO</b><br>Dominik Šuškevič<br>Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a></p></div></div>`;

function getPaymentDetailsHtml(method, depositAmount, clientName) {
    if (method === 'PayPal') {
        return `
            <div style="background: #ffffff; border: 1px solid #113939; border-left: 5px solid #003087; padding: 20px; border-radius: 4px; margin: 25px 0;">
                <p style="margin: 0 0 10px 0; color: #003087; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">PayPal apmokėjimo informacija:</p>
                <p style="margin: 0 0 6px 0; font-size: 15px; color: #1A2B2B;"><b>Gavėjo el. paštas:</b> <span style="background: #E5ECE9; padding: 3px 8px; border-radius: 3px; font-family: monospace; font-size: 14px;">Dominikphotofficial.lt@gmail.com</span></p>
                <p style="margin: 0 0 6px 0; font-size: 15px; color: #1A2B2B;"><b>Mokėtina suma (50% avansas):</b> <b style="color: #113939; font-size: 17px;">${depositAmount} €</b></p>
                <p style="margin: 0; font-size: 14px; color: #555555;"><b>Mokėjimo paskirtis / pastaba:</b> Užsakymo avansas – ${clientName}</p>
            </div>
        `;
    }
    return `
        <div style="background: #ffffff; border: 1px solid #113939; border-left: 5px solid #113939; padding: 20px; border-radius: 4px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0; color: #113939; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Bankinio pavedimo rekvizitai:</p>
            <p style="margin: 0 0 6px 0; font-size: 15px; color: #1A2B2B;"><b>Gavėjas:</b> DOMINIK ŠUŠKEVIČ</p>
            <p style="margin: 0 0 6px 0; font-size: 15px; color: #1A2B2B;"><b>Sąskaitos numeris (IBAN):</b> <span style="background: #E5ECE9; padding: 3px 8px; border-radius: 3px; font-family: monospace; font-size: 15px; font-weight: bold;">LT867300010171188764</span></p>
            <p style="margin: 0 0 6px 0; font-size: 15px; color: #1A2B2B;"><b>Mokėtina suma (50% avansas):</b> <b style="color: #113939; font-size: 17px;">${depositAmount} €</b></p>
            <p style="margin: 0; font-size: 14px; color: #555555;"><b>Mokėjimo paskirtis:</b> Užsakymo avansas – ${clientName}</p>
        </div>
    `;
}

const texts = {
    lt: {
        greeting: "Sveiki, {{name}}!",
        TFPNew: { sub: "DP.PORTFOLIO | Gauta TFP fotosesijos užklausa", txt: "Labai ačiū už jūsų užklausą ir pasiūlytą idėją!\n\nPeržiūrėsime jūsų anketą ir netrukus susisieksime." },
        TFPConfirmed: { sub: "DP.PORTFOLIO | Patvirtinta: TFP Fotosesija", txt: "Mums labai patiko jūsų idėja, todėl su džiaugsmu patvirtiname jūsų TFP fotosesiją.\n\nNekantraujame pradėti kurti kartu! Susitikimo detalės pateiktos žemiau." },
        TFPRescheduled: { sub: "DP.PORTFOLIO | Atnaujinta: TFP Fotosesija", txt: "Norime informuoti, kad jūsų TFP fotosesijos laikas arba vieta buvo atnaujinta.\n\nJei šis laikas jums netinka, prašome atsakyti į šį laišką. Ačiū už jūsų lankstumą!" },
        TFPCancelled: { sub: "DP.PORTFOLIO | Atšaukta: TFP Fotosesija", txt: "Apgailestaujame, tačiau dėl nenumatytų aplinkybių turime atšaukti jūsų TFP fotosesiją.\n\nLabai vertiname jūsų norą bendradarbiauti ir tikimės, kad ateityje turėsime progą sukurti kažką gražaus kartu." },
        TFPCompleted: { sub: "DP.PORTFOLIO | Ačiū už fotosesiją! Nuotraukos paruoštos", txt: "Didelis ačiū už jūsų laiką, pastangas ir puikią nuotaiką fotosesijos metu!\n\nJūsų nuotraukos jau pilnai paruoštos peržiūrai ir atsisiuntimui." },
        ServiceConfirmed: { sub: "DP.PORTFOLIO | Užsakymas patvirtintas – Mokėjimo informacija", txt: "Jūsų paslaugos užsakymas yra patvirtintas!\n\nNorėdami galutinai rezervuoti laiką, atlikite 50% avanso mokėjimą pagal žemiau pateiktus jūsų pasirinkto būdo rekvizitus." },
        ServiceDepositPaid: { sub: "DP.PORTFOLIO | Avansas gautas. Rezervacija patvirtinta!", txt: "Sėkmingai gavome jūsų avansinį mokėjimą.\n\nJūsų rezervacija yra pilnai patvirtinta. Susitiksime sutartu laiku! Likusią sumą galėsite apmokėti po fotosesijos." },
        ServiceFullyPaid: { sub: "DP.PORTFOLIO | Pilnas apmokėjimas gautas. Ačiū!", txt: "Informuojame, kad sėkmingai gavome pilną apmokėjimą už paslaugas.\n\nNuoširdžiai dėkojame už bendradarbiavimą ir pasitikėjimą!" },
        ServiceCompleted: { sub: "DP.PORTFOLIO | Paslauga atlikta. Nuotraukos paruoštos!", txt: "Jūsų užsakymas yra sėkmingai atliktas!\n\nVisos nuotraukos yra paruoštos ir patalpintos jūsų asmeninėje galerijoje." },
        ServiceCancelled: { sub: "DP.PORTFOLIO | Užsakymas atšauktas", txt: "Informuojame, kad jūsų užsakymas buvo atšauktas.\n\nJei tai įvyko per klaidą arba turite klausimų, susisiekite su mumis atsakydami į šį laišką." },
        ServiceStatusUpdate: { sub: "DP.PORTFOLIO | Užsakymo statusas atnaujintas", txt: "Informuojame, kad jūsų užsakymo statusas buvo atnaujintas." },
        labels: { date: "Data ir laikas (24h):", loc: "Vieta:", price: "Bendra kaina:", dep: "Avansas (50%):", rem: "Likutis po atlikimo:", srv: "Paslauga:", status: "Naujas statusas:", payMethod: "Mokėjimo būdas:" },
        gallery: { title: "Jūsų nuotraukų galerija paruošta", desc: "Spustelėkite žemiau esantį mygtuką norėdami atidaryti savo albumą:", btn: "Atidaryti Wfolio galeriją" },
        receipt: { title: "Mokėjimo kvitas / Sąskaita faktūra", desc: "Prisegtas oficialus jūsų apmokėjimo patvirtinimo dokumentas:", btn: "Atsisiųsti kvitą (PDF / Failas)" }
    },
    en: {
        greeting: "Hello, {{name}}!",
        TFPNew: { sub: "DP.PORTFOLIO | TFP Photoshoot Request Received", txt: "Thank you for your inquiry and idea proposal!\n\nWe will review your submission and contact you shortly." },
        TFPConfirmed: { sub: "DP.PORTFOLIO | Confirmed: TFP Photoshoot", txt: "We loved your idea and are thrilled to confirm your TFP photoshoot!\n\nMeeting details are provided below." },
        TFPRescheduled: { sub: "DP.PORTFOLIO | Rescheduled: TFP Photoshoot", txt: "We wanted to let you know that your TFP photoshoot details have been updated.\n\nIf this new time does not work for you, please reply to this email." },
        TFPCancelled: { sub: "DP.PORTFOLIO | Cancelled: TFP Photoshoot", txt: "We sincerely apologize, but due to unforeseen circumstances, we have to cancel your TFP photoshoot.\n\nThank you for understanding." },
        TFPCompleted: { sub: "DP.PORTFOLIO | Thank you! Photos are ready", txt: "A huge thank you for your time and great energy during the photoshoot!\n\nYour photos are ready to view and download below." },
        ServiceConfirmed: { sub: "DP.PORTFOLIO | Order Confirmed – Payment Details", txt: "Your service order is confirmed!\n\nTo secure your date and time, please transfer the 50% deposit using your chosen payment details below." },
        ServiceDepositPaid: { sub: "DP.PORTFOLIO | Deposit Received. Booking Confirmed!", txt: "We have successfully received your deposit payment.\n\nYour booking is locked in. See you at the agreed time!" },
        ServiceFullyPaid: { sub: "DP.PORTFOLIO | Full Payment Received", txt: "We would like to inform you that we have received full payment.\n\nThank you very much for your trust!" },
        ServiceCompleted: { sub: "DP.PORTFOLIO | Service Completed. Photos are ready!", txt: "Your order has been completed!\n\nAll photos are ready in your private gallery." },
        ServiceCancelled: { sub: "DP.PORTFOLIO | Order Cancelled", txt: "We would like to inform you that your order has been cancelled." },
        ServiceStatusUpdate: { sub: "DP.PORTFOLIO | Order Status Updated", txt: "We would like to inform you that your order status has been updated." },
        labels: { date: "Date & Time (24h):", loc: "Location:", price: "Total Price:", dep: "Deposit (50%):", rem: "Remaining Balance:", srv: "Service:", status: "New Status:", payMethod: "Payment Method:" },
        gallery: { title: "Your gallery is ready", desc: "Click the button below to access your album:", btn: "Open Wfolio Gallery" },
        receipt: { title: "Payment Receipt / Invoice", desc: "Your official payment document is ready for download:", btn: "Download Receipt" }
    },
    ru: {
        greeting: "Здравствуйте, {{name}}!",
        TFPNew: { sub: "DP.PORTFOLIO | Получена заявка на TFP фотосессию", txt: "Большое спасибо за вашу заявку и предложенную идею!\n\nМы рассмотрим вашу анкету и скоро свяжемся с вами." },
        TFPConfirmed: { sub: "DP.PORTFOLIO | Подтверждено: TFP Фотосессия", txt: "Ваша заявка на TFP фотосессию подтверждена!\n\nДетали встречи указаны ниже." },
        TFPRescheduled: { sub: "DP.PORTFOLIO | Обновлено: TFP Фотосессия", txt: "Время или место вашей TFP фотосессии было изменено.\n\nЕсли новое время вам не подходит, ответьте на это письмо." },
        TFPCancelled: { sub: "DP.PORTFOLIO | Отменено: TFP Фотосессия", txt: "К сожалению, мы вынуждены отменить вашу TFP фотосессию.\n\nСпасибо за понимание." },
        TFPCompleted: { sub: "DP.PORTFOLIO | Спасибо за съемку! Фотографии готовы", txt: "Огромное спасибо за отличную фотосессию!\n\nВаши фотографии уже загружены и готовы к просмотру." },
        ServiceConfirmed: { sub: "DP.PORTFOLIO | Заказ подтвержден – Реквизиты для оплаты", txt: "Ваш заказ подтвержден!\n\nДля окончательного бронирования даты внесите 50% аванса по указанным ниже реквизитам вашего способа оплаты." },
        ServiceDepositPaid: { sub: "DP.PORTFOLIO | Аванс получен. Бронь подтверждена!", txt: "Мы успешно получили ваш аванс.\n\nБронирование подтверждено, до встречи в назначенное время!" },
        ServiceFullyPaid: { sub: "DP.PORTFOLIO | Полная оплата получена. Спасибо!", txt: "Полная оплата за заказ успешно получена.\n\nИскренне благодарим за сотрудничество!" },
        ServiceCompleted: { sub: "DP.PORTFOLIO | Заказ выполнен. Фотографии готовы!", txt: "Ваш заказ успешно выполнен!\n\nФотографии доступны в вашей персональной галерее." },
        ServiceCancelled: { sub: "DP.PORTFOLIO | Заказ отменен", txt: "Сообщаем, что ваш заказ был отменен." },
        ServiceStatusUpdate: { sub: "DP.PORTFOLIO | Статус заказа обновлен", txt: "Статус вашего заказа был обновлен." },
        labels: { date: "Дата и время (24ч):", loc: "Место:", price: "Общая стоимость:", dep: "Аванс (50%):", rem: "Остаток:", srv: "Услуга:", status: "Новый статус:", payMethod: "Способ оплаты:" },
        gallery: { title: "Ваша галерея готова", desc: "Нажмите кнопку ниже, чтобы открыть альбом:", btn: "Открыть галерею Wfolio" },
        receipt: { title: "Чек об оплате / Квитанция", desc: "Ваш официальный документ об оплате доступен для скачивания:", btn: "Скачать квитанцию" }
    }
};

export function getDefaultContent(templateType, lang, data) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang];
    const template = t[templateType] || t.ServiceStatusUpdate;

    let subject = template.sub;
    let greeting = t.greeting.replace('{{name}}', data.name || '');
    let text = template.txt;

    let boxHtml = '';
    if (data.status && templateType === 'ServiceStatusUpdate') {
        boxHtml = `<div style="${boxStyle}"><p style="margin:0; font-size:16px; color:#1A2B2B;"><b>${t.labels.status}</b> <span style="color:#113939; font-weight:bold; text-transform:uppercase;">${data.status}</span></p></div>`;
    } else if (data.finalPrice) {
        boxHtml = `
            <div style="${boxStyle}">
                <p style="margin:0 0 7px 0; font-size:15px; color:#1A2B2B;"><b>${t.labels.srv}</b> ${data.serviceName}</p>
                <p style="margin:0 0 7px 0; font-size:15px; color:#1A2B2B;"><b>${t.labels.date}</b> ${data.date_time}</p>
                <p style="margin:0 0 7px 0; font-size:15px; color:#1A2B2B;"><b>${t.labels.loc}</b> ${data.location}</p>
                <p style="margin:0 0 7px 0; font-size:15px; color:#1A2B2B;"><b>${t.labels.price}</b> ${data.finalPrice} €</p>
                <p style="margin:0 0 7px 0; font-size:15px; color:#1A2B2B;"><b>${t.labels.dep}</b> <b style="color:#113939;">${data.depositAmount} €</b></p>
                <p style="margin:0; font-size:15px; color:#1A2B2B;"><b>${t.labels.payMethod}</b> ${data.paymentMethod || 'Bank Transfer'}</p>
            </div>
        `;

        if (templateType === 'ServiceConfirmed' || templateType === 'ServiceNew') {
            boxHtml += getPaymentDetailsHtml(data.paymentMethod, data.depositAmount, data.name || '');
        }
    } else if (data.date_time && data.location) {
        boxHtml = `
            <div style="${boxStyle}">
                <p style="margin:0 0 7px 0; font-size:15px; color:#1A2B2B;"><b>${t.labels.date}</b> ${data.date_time}</p>
                <p style="margin:0; font-size:15px; color:#1A2B2B;"><b>${t.labels.loc}</b> ${data.location}</p>
            </div>
        `;
    }

    return { subject, greeting, text, boxHtml };
}

export function getGalleryHtml(lang, url) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].gallery;
    return `
        <div style="background: #ffffff; border: 1px solid #113939; padding: 28px 20px; border-radius: 6px; text-align: center; margin: 25px 0; box-shadow: 0 4px 15px rgba(17,57,57,0.06);">
            <p style="margin: 0 0 6px 0; color: #113939; font-size: 18px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${t.title}</p>
            <p style="margin: 0 0 18px 0; color: #555555; font-size: 14px;">${t.desc}</p>
            <a href="${url}" target="_blank" style="display: inline-block; background-color: #113939; color: #ffffff; padding: 14px 34px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; font-weight: 500; border-radius: 4px; box-shadow: 0 4px 12px rgba(17,57,57,0.2);">${t.btn}</a>
        </div>
    `;
}

export function getReceiptHtml(lang, url) {
    const safeLang = texts[lang] ? lang : 'lt';
    const t = texts[safeLang].receipt;
    return `
        <div style="background: #FBF9F6; border: 2px dashed #113939; padding: 24px 20px; border-radius: 6px; text-align: center; margin: 25px 0;">
            <p style="margin: 0 0 6px 0; color: #113939; font-size: 16px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${t.title}</p>
            <p style="margin: 0 0 16px 0; color: #555555; font-size: 14px;">${t.desc}</p>
            <a href="${url}" target="_blank" style="display: inline-block; background-color: #2A5C5C; color: #ffffff; padding: 13px 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; font-weight: bold; border-radius: 4px; box-shadow: 0 4px 12px rgba(42,92,92,0.25);">${t.btn}</a>
        </div>
    `;
}

export function buildFinalHtml(greeting, text, boxHtml, galleryHtml, receiptHtml) {
    const formattedText = text.replace(/\n/g, '<br>');
    return `${emailWrapperStart}
        <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">${greeting}</h2>
        <p style="color: #1A2B2B; font-size: 16px; line-height: 1.7;">${formattedText}</p>
        ${boxHtml || ''}
        ${receiptHtml || ''}
        ${galleryHtml || ''}
    ${emailWrapperEnd}`;
}

export function buildEmail(templateType, lang, data) {
    const typeKey = templateType === 'New' ? 'TFPNew' : templateType;
    const { subject, greeting, text, boxHtml } = getDefaultContent(typeKey, lang, data);
    const html = buildFinalHtml(greeting, text, boxHtml, '', '');
    return { subject, html };
}
