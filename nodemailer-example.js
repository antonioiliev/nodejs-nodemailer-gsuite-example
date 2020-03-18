// Import nodemailer module and the GSuite generated keys. In this example I am using the ECMAScript ES6 'import' statement, but you can use 'require'
import nodemailer from 'nodemailer'; // const nodemailer = require('nodemailer');
import * as key from './GSuiteAuth.json'; // const key = require('./GSuiteAuth.json');

nodeMailerExample = async () => {
    const senderEmailAddress = 'sender@alpibo.com';
    const receiverEmailAddress = 'receiver@alpibo.com';

    // The first thing we need to do is create the nodemailer transporter object which holds the necessary authentication data
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: senderEmailAddress,
            serviceClient: key.client_id,
            privateKey: key.private_key
        }
    });

    // With the verify() function we can check whether the authentication is successful. If it isn`t, then terminate function execution with the error.
    try {
        await transporter.verify();
    } catch (error) {
        throw error;
    }

    /* 
    * If the verification is successful, we need to create an object with the mail options. 
    * We can also add attachments to files here.
    */
    const mailOptions = {
        from: senderEmailAddress,
        to: receiverEmailAddress, 
        subject: 'Test email', 
        html: '<p>Some HTML</p>'
    };

    /*
    * The sendMail() function does what it says it does. Sends the mail. 
    * What we can do is wait for the function callback and check the returned information. 
    * The info response will give us information whether the email has been accepted by the recipient address, so we can be sure that it has been delivered. 
    * Alternatively, we can catch() an error if it is thrown and then handle it.
    */
    const info = await transporter.sendMail(mailOptions);
}

