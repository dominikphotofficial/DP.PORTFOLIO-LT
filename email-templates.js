export const templates = {
    lt: {
        New: {
            subject: "DP.PORTFOLIO | TFP Užklausa gauta",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}}!</h2>
                    <p>Ačiū, kad pasidalinote savo kūrybine vizija. Sėkmingai gavome jūsų TFP fotosesijos užklausą!</p>
                    <p>Artimiausiu metu atidžiai peržiūrėsime jūsų idėją ir susisieksime su jumis, kad aptartume detales.</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Jūsų pateikta informacija:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                        <p style="margin: 0 0 5px 0;"><b>Vieta:</b> {{location}}</p>
                        <p style="margin: 0;"><b>Idėja:</b> {{idea}}</p>
                    </div>
                    <p>Jei turite papildomų klausimų ar norite kažką patikslinti, drąsiai rašykite mums.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Fotosesija patvirtinta!",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Puikios naujienos, {{name}}!</h2>
                    <p>Mums labai patiko jūsų idėja, todėl su džiaugsmu patvirtiname jūsų TFP fotosesiją!</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Susitikimo detalės:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                        <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                    </div>
                    <p>Nekantraujame pradėti kurti kartu. Jei turite kokių nors klausimų prieš fotosesiją, būtinai susisiekite.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | TFP Fotosesijos laikas pakeistas",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                    <p>Norime informuoti, kad turėjome šiek tiek pakoreguoti jūsų TFP fotosesijos laiką arba vietą.</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Nauja informacija:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Data ir laikas:</b> {{date_time}}</p>
                        <p style="margin: 0;"><b>Vieta:</b> {{location}}</p>
                    </div>
                    <p>Jei šis naujas laikas jums netinka, prašome atsakyti į šį laišką ir nurodyti, kuriomis dienomis esate laisvi – mes būtinai rasime jums patogų variantą.</p>
                    <p>Nuoširdžiai dėkojame už jūsų supratingumą ir lankstumą!</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Fotosesija atšaukta",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}},</h2>
                    <p>Apgailestaujame, tačiau dėl nenumatytų aplinkybių turime atšaukti jūsų TFP fotosesiją.</p>
                    <p>Labai vertiname jūsų norą bendradarbiauti ir tikimės, kad ateityje turėsime progą sukurti kažką gražaus kartu.</p>
                    <p>Ačiū už jūsų supratingumą.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Completed: {
            subject: "DP.PORTFOLIO | Ačiū už nuostabią fotosesiją!",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Sveiki, {{name}}!</h2>
                    <p>Didelis ačiū už jūsų laiką, pastangas ir puikią nuotaiką fotosesijos metu. Tikimės, kad procesas jums patiko taip pat, kaip ir mums!</p>
                    <p>Šiuo metu jau dirbame prie jūsų nuotraukų redagavimo. Kai tik jos bus paruoštos, atsiųsime jums nuorodą.</p>
                    <p>Labai tikimės, kad galutinis rezultatas jums patiks ir viršys lūkesčius!</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://portfolio.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">portfolio.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        }
    },
    en: {
        New: {
            subject: "DP.PORTFOLIO | TFP Request Received",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello, {{name}}!</h2>
                    <p>Thank you for reaching out and sharing your creative vision with us. We have successfully received your TFP photoshoot request!</p>
                    <p>We will carefully review your idea and get back to you shortly to discuss the details.</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Your Request Details:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                        <p style="margin: 0 0 5px 0;"><b>Location:</b> {{location}}</p>
                        <p style="margin: 0;"><b>Idea:</b> {{idea}}</p>
                    </div>
                    <p>If you have any additional questions or want to clarify anything, feel free to reply to this email.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://en.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">en.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Confirmed!",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Great news, {{name}}!</h2>
                    <p>We absolutely loved your idea and are thrilled to confirm your TFP photoshoot!</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Meeting Details:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                        <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                    </div>
                    <p>We can't wait to start creating together. If you have any questions before the shoot, just let us know.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://en.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">en.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Rescheduled",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello, {{name}},</h2>
                    <p>We wanted to let you know that we had to make a slight adjustment to the time or location of your TFP photoshoot.</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>New Details:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Date & Time:</b> {{date_time}}</p>
                        <p style="margin: 0;"><b>Location:</b> {{location}}</p>
                    </div>
                    <p>If this new time doesn't work for you, please reply to this email and let us know what days you are free. We will do our best to find the perfect time for you.</p>
                    <p>Thank you so much for your understanding and flexibility!</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://en.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">en.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Photoshoot Cancelled",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello, {{name}},</h2>
                    <p>We sincerely apologize, but due to unforeseen circumstances, we have to cancel your TFP photoshoot at this time.</p>
                    <p>We truly appreciate your interest in collaborating with us and hope we will have the opportunity to create something beautiful together in the future.</p>
                    <p>Thank you for your understanding.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://en.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">en.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Completed: {
            subject: "DP.PORTFOLIO | Thank you for the amazing photoshoot!",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Hello, {{name}}!</h2>
                    <p>A huge thank you for your time, effort, and great energy during the photoshoot. We hope you enjoyed the process as much as we did!</p>
                    <p>We are currently working on editing your photos. As soon as they are ready, we will send you a link to download them.</p>
                    <p>We really hope you will love the final result!</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://en.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">en.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        }
    },
    ru: {
        New: {
            subject: "DP.PORTFOLIO | Заявка TFP получена",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}}!</h2>
                    <p>Спасибо, что поделились своей творческой идеей. Мы успешно получили вашу заявку на TFP фотосессию!</p>
                    <p>В ближайшее время мы внимательно изучим вашу идею и свяжемся с вами для обсуждения деталей.</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Детали вашей заявки:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                        <p style="margin: 0 0 5px 0;"><b>Место:</b> {{location}}</p>
                        <p style="margin: 0;"><b>Идея:</b> {{idea}}</p>
                    </div>
                    <p>Если у вас есть дополнительные вопросы или вы хотите что-то уточнить, смело пишите нам в ответ на это письмо.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://ru.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">ru.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Confirmed: {
            subject: "DP.PORTFOLIO | TFP Фотосессия подтверждена!",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Отличные новости, {{name}}!</h2>
                    <p>Нам безумно понравилась ваша идея, и мы с радостью подтверждаем вашу TFP фотосессию!</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Детали встречи:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                        <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                    </div>
                    <p>С нетерпением ждем начала совместного творчества. Если у вас возникнут вопросы до съемки, обязательно дайте знать.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://ru.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">ru.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Rescheduled: {
            subject: "DP.PORTFOLIO | Время TFP фотосессии изменено",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                    <p>Хотим сообщить, что нам пришлось немного скорректировать время или место вашей TFP фотосессии.</p>
                    <div style="background: #FBF9F6; padding: 20px; border-left: 3px solid #113939; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0;"><b>Новая информация:</b></p>
                        <p style="margin: 0 0 5px 0;"><b>Дата и время:</b> {{date_time}}</p>
                        <p style="margin: 0;"><b>Место:</b> {{location}}</p>
                    </div>
                    <p>Если это новое время вам не подходит, пожалуйста, ответьте на это письмо и напишите, в какие дни вы свободны. Мы обязательно подберем идеальный для вас вариант.</p>
                    <p>Огромное спасибо за ваше понимание и гибкость!</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://ru.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">ru.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Cancelled: {
            subject: "DP.PORTFOLIO | TFP Фотосессия отменена",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}},</h2>
                    <p>Приносим свои извинения, но из-за непредвиденных обстоятельств мы вынуждены отменить вашу TFP фотосессию на данный момент.</p>
                    <p>Мы очень ценим ваше желание сотрудничать и надеемся, что в будущем у нас появится возможность создать что-то красивое вместе.</p>
                    <p>Спасибо за ваше понимание.</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://ru.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">ru.dominikphotofficial.lt</a>
                    </p>
                </div>
            `
        },
        Completed: {
            subject: "DP.PORTFOLIO | Спасибо за потрясающую фотосессию!",
            html: `
                <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1A2B2B; line-height: 1.6; max-width: 600px; margin: 0 auto;">
                    <h2 style="font-weight: 300; letter-spacing: 2px; text-transform: uppercase;">Здравствуйте, {{name}}!</h2>
                    <p>Огромное спасибо за ваше время, старания и отличную атмосферу во время фотосессии. Надеемся, вам понравился процесс так же сильно, как и нам!</p>
                    <p>Сейчас мы уже работаем над обработкой ваших фотографий. Как только они будут готовы, мы пришлем вам ссылку для скачивания.</p>
                    <p>Очень надеемся, что финальный результат вам понравится и превзойдет ожидания!</p>
                    <br>
                    <hr style="border: none; border-top: 1px solid #E5ECE9; margin: 20px 0;">
                    <p style="font-size: 0.9em; color: #2A5C5C; margin: 0;">
                        <b>DP.PORTFOLIO</b><br>
                        Dominik Šuškevič<br>
                        Instagram: <a href="https://instagram.com/dominikphotofficial" style="color: #113939; text-decoration: none;">@dominikphotofficial</a><br>
                        Web: <a href="https://ru.dominikphotofficial.lt" style="color: #113939; text-decoration: none;">ru.dominikphotofficial.lt</a>
                    </p>
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
