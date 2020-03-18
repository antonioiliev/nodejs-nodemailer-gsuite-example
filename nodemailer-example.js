import nodemailer from 'nodemailer';
import * as key from './GSuiteAuth.json';

nodeMailerExample = async () => {
    const senderEmailAddress = 'sender@alpibo.com';
    const receiverEmailAddress = 'receiver@alpibo.com';

    const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: EMAIL_ADDRESS,
            serviceClient: key.client_id,
            privateKey: key.private_key
        }
    });

    try {
        await transporter.verify();
    } catch (error) {
        throw error;
    }

    const mailOptions = {
        from: senderEmailAddress,
        to: receiverEmailAddress, 
        subject: 'Test email', 
        html: '<p>Some HTML</p>'
    };

    const info = await transporter.sendMail(mailOptions);
}

