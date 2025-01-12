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
        debug: true // Enable debug output
    });

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent to ${to}`);
    } catch (error: any) {
        logger.error(`Failed to send email to ${to}: ${error.message}`);
        throw error; // Propagate the error to be handled by the controller
    }
}

// New sendOTP function
export const sendOTP = async (to: string, otp: string) => {
    const subject = "Your OTP Code";
    const html = `<h1>Your OTP is: ${otp}</h1>`;
    await sendMail(process.env.NODEMAILER_GMAIL_USER as string, to, subject, html);
}