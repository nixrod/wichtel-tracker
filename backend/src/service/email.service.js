const db = require('../mysql');
const sgMail = require('@sendgrid/mail')

class EmailService {


    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }

    async getEmailInfo() {
        return new Promise(resolve => {
            db.connection.query('SELECT giver.name as giver_name, giver.email as giver_email, receiver.name as receiver_name, wishes as receiver_wishlist,\n' +
                '       receiver.address as receiver_address\n' +
                'FROM assignments a\n' +
                'LEFT JOIN users as giver on a.giver_id = giver.id\n' +
                'LEFT JOIN users as receiver on a.receiver_id = receiver.id\n' +
                'LEFT JOIN wishlists as w on receiver.id = w.user_id', function (err, rows) {
                if (err) throw err;
                resolve(rows);
            });
        });
    }

    sendMessages(emailData) {
        emailData.forEach(entry => {

            const msg = {
                to: entry.giver_email,
                from: 'happel.michael@gmail.com',
                subject: 'Hier kommen die Wichtelwünsche für 2020!',
                html: `<p>Hallo ${entry.giver_name},</p><p>der Wichtelgenerator hat für dich ✨<strong>${entry.receiver_name}</strong>✨ ausgesucht.</p><p>${entry.receiver_name} wünscht sich folgendes zu Weihnachten:<br>${entry.receiver_wishlist}</p><p>Falls das gemeinsame Weihnachtsfest wegen Corona ausfällt kannst du die Wünsche an:<br>${entry.receiver_address}<br>schicken.</p><p>Liebe Grüße,<br>der Wichtelgenerator 🤖</p>`,
            }

            sgMail
                .send(msg)
                .then(() => {
                    console.log(`Email to ${entry.giver_email} was sent successfully`);
                })
                .catch((error) => {
                    console.error(`Email delivery to ${entry.giver_email} failed. Reason: ${error}`);
                })

        });

    }
}

module.exports = EmailService;
