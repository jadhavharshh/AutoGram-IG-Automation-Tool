import nodemailer from 'nodemailer';
import winston from 'winston';
import dotenv from "dotenv";


dotenv.config();

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [new winston.transports.Console()]
});

export const sendMail = async (from: string, to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_GMAIL_USER,
            pass: process.env.NODEMAILER_APP_PASSWORD
        },
        from : process.env.NODEMAILER_GMAIL_USER,
        to : "satxnhere",
        subject : "Hello",
        html : "<h1>Hi</h1>"

    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    logger.info(`Sending mail to - ${to}`);
    transporter.sendMail(mailOptions, (error, info)=> {
        if (error) {
            logger.error(error);
        } else {
            logger.info('Email sent: ' + info.response);
        }
    });
}
