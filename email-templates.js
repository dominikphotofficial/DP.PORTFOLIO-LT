const emailWrapperStart = `<div style="background-color: #FBF9F6; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"><div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 4px; border-top: 4px solid #113939; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">`;
const boxStyle = `border: 1px solid #E5ECE9; padding: 20px; margin: 20px 0; border-radius: 4px; background-color: #FBF9F6;`;
const emailWrapperEnd = `<hr style="border: none; border-top: 1px solid #E5ECE9; margin: 30px 0;"><p style="font-size: 0.9em; color: #2A5C5C; margin: 0; line-height: 1.6;"><b>DP.PORTFOLIO</b><br>Dominik Šuškevič<br>Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a></p></div></div>`;

const texts = {
    lt: {
        greeting: "Sveiki, {{name}}!",
        TFPConfirmed: { sub: "DP.PORTFOLIO | Patvirtinta: TFP Fotosesija", txt: "Mums labai patiko jūsų idėja, todėl su džiaugsmu patvirtiname jūsų TFP fotosesiją.\n\nNekantraujame pradėti kurti kartu! Iki greito." },
        TFPRescheduled: { sub: "DP.PORTFOLIO | Atnaujinta: TFP Fotosesija", txt: "Norime informuoti, kad jūsų TFP fotosesijos detalės buvo atnaujintos.\n\nJei šis laikas jums netinka, prašome atsakyti į šį laišką. Ačiū už jūsų lankstumą!" },
        TFPCancelled: { sub: "DP.PORTFOLIO | Atšaukta: TFP Fotosesija", txt: "Apgailestaujame, tačiau dėl nenumatytų aplinkybių turime atšaukti jūsų TFP fotosesiją.\n\nLabai vertiname jūsų norą bendradarbiauti ir tikimės, kad ateityje turėsime progą sukurti kažką gražaus kartu." },
        TFPCompleted: { sub: "DP.PORTFOLIO | Ačiū už fotosesiją! Nuotraukos paruoštos", txt: "Didelis ačiū už jūsų laiką, pastangas ir puikią nuotaiką fotosesijos metu!\n\nTikimės, kad rezultatas jums patiks!" },
        ServiceConfirmed: { sub: "DP.PORTFOLIO | Užsakymas patvirtintas", txt: "Jūsų užsakymas yra patvirtintas!\n\nPrašome atlikti avansinį mokėjimą, kad galutinai rezervuotume laiką. Apmokėjimo instrukcijas rasite ankstesniame laiške." },
        ServiceDepositPaid: { sub: "DP.PORTFOLIO | Avansas gautas. Ačiū!", txt: "Sėkmingai gavome jūsų avansinį mokėjimą.\n\nJūsų rezervacija yra pilnai patvirtinta. Susitiksime sutartu laiku! Likutį galėsite apmokėti po paslaugos atlikimo." },
        ServiceFullyPaid: { sub: "DP.PORTFOLIO | Pilnas apmokėjimas gautas", txt: "Informuojame, kad sėkmingai gavome pilną apmokėjimą už paslaugą.\n\nNuoširdžiai dėkojame už bendradarbiavimą!" },
        ServiceCompleted: { sub: "DP.PORTFOLIO | Paslauga atlikta. Nuotraukos paruoštos!", txt: "Jūsų užsakymas yra sėkmingai atliktas!\n\nAčiū, kad pasirinkote DP.PORTFOLIO. Tikimės, kad rezultatas jums patiko ir lauksime sugrįžtant ateityje." },
        ServiceCancelled: { sub: "DP.PORTFOLIO | Užsakymas atšauktas", txt: "Informuojame, kad jūsų užsakymas buvo atšauktas.\n\nJei tai įvyko per klaidą arba turite klausimų, prašome susisiekti su mumis." },
        ServiceStatusUpdate: { sub: "DP.PORTFOLIO | Užsakymo statusas atnaujintas", txt: "Informuojame, kad jūsų užsakymo statusas buvo atnaujintas.\n\nJei turite klausimų, tiesiog atsakykite į šį laišką." },
        labels: { date: "Data ir laikas:", loc: "Vieta:", price: "Bendra kaina:", dep: "Avansas (50%):", srv: "Paslauga:", status: "Naujas statusas:" },
        gallery: { title: "Jūsų nuotraukos paruoštos!", btn: "Atidaryti galeriją", pinText: "Jūsų asmeninis PIN kodas:" }
    },
    en: {
        greeting: "Hello, {{name}}!",
        TFPConfirmed: { sub: "DP.PORTFOLIO | Confirmed: TFP Photoshoot", txt: "We absolutely loved your idea and are thrilled to confirm your TFP photoshoot.\n\nWe can't wait to start creating together! See you soon." },
        TFPRescheduled: { sub: "DP.PORTFOLIO | Rescheduled: TFP Photoshoot", txt: "We wanted to let you know that your TFP photoshoot details have been updated.\n\nIf this new time doesn't work for you, please reply to this email. Thank you for your flexibility!" },
        TFPCancelled: { sub: "DP.PORTFOLIO | Cancelled: TFP Photoshoot", txt: "We sincerely apologize, but due to unforeseen circumstances, we have to cancel your TFP photoshoot.\n\nWe truly appreciate your interest and hope we will have the opportunity to create something beautiful together in the future." },
        TFPCompleted: { sub: "DP.PORTFOLIO | Thank you for the photoshoot! Photos are ready", txt: "A huge thank you for your time, effort, and great energy during the photoshoot!\n\nWe hope you will love the final result!" },
        ServiceConfirmed: { sub: "DP.PORTFOLIO | Order Confirmed. Deposit Required", txt: "Your order is confirmed!\n\nTo fully secure your date and time, please proceed with the deposit payment. Payment instructions are in the previous email." },
        ServiceDepositPaid: { sub: "DP.PORTFOLIO | Deposit Received. Thank you!", txt: "We have successfully received your deposit payment.\n\nYour booking is now fully confirmed. See you at the agreed time! The remaining balance can be paid after the service is completed." },
        ServiceFullyPaid: { sub: "DP.PORTFOLIO | Full Payment Received", txt: "We would like to inform you that we have successfully received the full payment for your order.\n\nThank you very much for your cooperation!" },
        ServiceCompleted: { sub: "DP.PORTFOLIO | Service Completed. Photos are ready!", txt: "Your order has been successfully completed!\n\nThank you for choosing DP.PORTFOLIO. We hope you enjoyed the result and look forward to working with you again." },
        ServiceCancelled: { sub: "DP.PORTFOLIO | Order Cancelled", txt: "We would like to inform you that your order has been cancelled.\n\nIf this was a mistake or if you have any questions, please contact us." },
        ServiceStatusUpdate: { sub: "DP.PORTFOLIO | Order Status Updated", txt: "We would like to inform you that the status of your order has been updated.\n\nIf you have any questions, simply reply to this email." },
        labels: { date: "Date & Time:", loc: "Location:", price: "Total Price:", dep: "Deposit (50%):", srv: "Service:", status: "New Status:" },
        gallery: { title: "Your photos are ready!", btn: "Open Gallery", pinText: "Your personal PIN code:" }
    },
    ru: {
        greeting: "Здравствуйте, {{name}}!",
        TFPConfirmed: { sub: "DP.PORTFOLIO | Подтверждено: TFP Фотосессия", txt: "Нам безумно понравилась ваша идея, и мы с радостью подтверждаем вашу TFP фотосессию.\n\nС нетерпением ждем начала совместного творчества! До скорой встречи." },
        TFPRescheduled: { sub: "DP.PORTFOLIO | Обновлено: TFP Фотосессия", txt: "Хотим сообщить, что детали вашей TFP фотосессии были обновлены.\n\nЕсли это новое время вам не подходит, пожалуйста, ответьте на это письмо. Спасибо за вашу гибкость!" },
        TFPCancelled: { sub: "DP.PORTFOLIO | Отменено: TFP Фотосессия", txt: "Приносим свои извинения, но из-за непредвиденных обстоятельств мы вынуждены отменить вашу TFP фотосессию.\n\nМы очень ценим ваше желание сотрудничать и надеемся, что в будущем у нас появится возможность создать что-то красивое вместе." },
        TFPCompleted: { sub: "DP.PORTFOLIO | Спасибо за фотосессию! Фотографии готовы", txt: "Огромное спасибо за ваше время, старания и отличную атмосферу во время фотосессии!\n\nНадеемся, результат вам очень понравится!" },
        ServiceConfirmed: { sub: "DP.PORTFOLIO | Заказ подтвержден. Требуется аванс", txt: "Ваш заказ подтвержден!\n\nЧтобы окончательно забронировать дату и время, пожалуйста, внесите аванс. Инструкции по оплате находятся в предыдущем письме." },
        ServiceDepositPaid: { sub: "DP.PORTFOLIO | Аванс получен. Спасибо!", txt: "Мы успешно получили ваш аванс.\n\nВаше бронирование полностью подтверждено. До встречи в назначенное время! Остаток можно будет оплатить после выполнения услуги." },
        ServiceFullyPaid: { sub: "DP.PORTFOLIO | Полная оплата получена", txt: "Сообщаем, что мы успешно получили полную оплату за вашу услугу.\n\nОгромное спасибо за сотрудничество!" },
        ServiceCompleted: { sub: "DP.PORTFOLIO | Услуга выполнена. Фотографии готовы!", txt: "Ваш заказ успешно выполнен!\n\nСпасибо, что выбрали DP.PORTFOLIO. Надеемся, вам понравился результат, и будем рады поработать с вами снова." },
        ServiceCancelled: { sub: "DP.PORTFOLIO | Заказ отменен", txt: "Сообщаем, что ваш заказ был отменен.\n\nЕсли это произошло по ошибке или у вас есть вопросы, пожалуйста, свяжитесь с нами." },
        ServiceStatusUpdate: { sub: "DP.PORTFOLIO | Статус заказа обновлен", txt: "Хотим сообщить, что статус вашего заказа был обновлен.\n\nЕсли у вас есть вопросы, просто ответьте на это письмо." },
        labels: { date: "Дата и время:", loc: "Место:", price: "Общая стоимость:", dep: "Аванс (50%):", srv: "Услуга:", status: "Новый статус:" },
        gallery: { title: "Ваши фотографии готовы!", btn: "Открыть галерею", pinText: "Ваш персональный PIN-код:" }
    }
};

export function getDefaultContent(templateType, lang, data) {
    const safeLang = texts[lang] ? lang : 'en';
    const t = texts[safeLang];
    const template = t[templateType] || t.ServiceStatusUpdate;
    
    let subject = template.sub;
    let greeting = t.greeting.replace('{{name}}', data.name || '');
    let text = template.txt;
    
    let boxHtml = '';
    if (data.status && templateType === 'ServiceStatusUpdate') {
        boxHtml = `<div style="${boxStyle}"><p style="margin:0; font-size:16px;"><b>${t.labels.status}</b> <span style="color:#113939; text-transform:uppercase;">${data.status}</span></p></div>`;
    } else if (data.finalPrice) {
        boxHtml = `<div style="${boxStyle}">
            <p style="margin:0 0 5px 0; font-size:15px;"><b>${t.labels.srv}</b> ${data.serviceName}</p>
            <p style="margin:0 0 5px 0; font-size:15px;"><b>${t.labels.date}</b> ${data.date_time}</p>
            <p style="margin:0 0 5px 0; font-size:15px;"><b>${t.labels.loc}</b> ${data.location}</p>
            <p style="margin:0 0 5px 0; font-size:15px;"><b>${t.labels.price}</b> €${data.finalPrice}</p>
            <p style="margin:0; font-size:15px;"><b>${t.labels.dep}</b> €${data.depositAmount}</p>
        </div>`;
    } else if (data.date_time && data.location) {
        boxHtml = `<div style="${boxStyle}">
            <p style="margin:0 0 5px 0; font-size:15px;"><b>${t.labels.date}</b> ${data.date_time}</p>
            <p style="margin:0; font-size:15px;"><b>${t.labels.loc}</b> ${data.location}</p>
        </div>`;
    }

    return { subject, greeting, text, boxHtml };
}

export function getGalleryHtml(lang, url, pin) {
    const safeLang = texts[lang] ? lang : 'en';
    const t = texts[safeLang].gallery;
    return `
        <div style="background: #FBF9F6; padding: 30px 20px; border-radius: 4px; text-align: center; margin: 25px 0; border: 1px solid #E5ECE9;">
            <p style="margin: 0 0 20px 0; color: #1A2B2B; font-size: 18px; font-weight: bold;">${t.title}</p>
            <a href="${url}" style="display: inline-block; background-color: #113939; color: #ffffff; padding: 15px 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 14px; border-radius: 4px; margin-bottom: 20px;">${t.btn}</a>
            <p style="margin: 0; color: #1A2B2B; font-size: 16px;">${t.pinText}</p>
            <p style="margin: 5px 0 0 0; color: #113939; font-size: 24px; font-weight: bold; letter-spacing: 4px;">${pin}</p>
        </div>
    `;
}

export function buildFinalHtml(greeting, text, boxHtml, galleryHtml) {
    const formattedText = text.replace(/\n/g, '<br>');
    return `${emailWrapperStart}
        <h2 style="color: #113939; font-weight: 300; letter-spacing: 2px; text-transform: uppercase; margin-top: 0;">${greeting}</h2>
        <p style="color: #1A2B2B; font-size: 16px; line-height: 1.6;">${formattedText}</p>
        ${boxHtml || ''}
        ${galleryHtml || ''}
    ${emailWrapperEnd}`;
}
