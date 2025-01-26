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
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            /* General Styles */
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                max-width: 150px;
            }
            .content {
                text-align: center;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin: 20px 0;
                letter-spacing: 2px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888888;
                padding-top: 20px;
                border-top: 1px solid #e4e4e4;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                .otp {
                    font-size: 20px;
                }
                .button {
                    padding: 8px 16px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <!-- Replace with your app's logo -->
                <a href="#" class="flex items-center gap-2 font-medium"><div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gallery-vertical-end size-4"><path d="M7 2h10"></path><path d="M5 6h14"></path><rect width="18" height="12" x="3" y="10" rx="2"></rect></svg></div>AutoGram.</a>
            </div>
            <div class="content">
                <h2>Welcome to AutoGram!</h2>
                <p>Thank you for signing up. Please use the OTP below to verify your email address.</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} AutoGram. All rights reserved.<br>
                Chembur, Mumbai
            </div>
        </div>
    </body>
    </html>
    `;
    await sendMail(process.env.NODEMAILER_GMAIL_USER as string, to, subject, html);
}

export const sendOTPForgotPassword = async (email: string, otp: string) => {
    const subject = "Your OTP Code";
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code</title>
        <style>
            /* General Styles */
            body {
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                max-width: 150px;
            }
            .content {
                text-align: center;
            }
            .otp {
                font-size: 24px;
                font-weight: bold;
                color: #333333;
                margin: 20px 0;
                letter-spacing: 2px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #888888;
                padding-top: 20px;
                border-top: 1px solid #e4e4e4;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
            }
            @media only screen and (max-width: 600px) {
                .container {
                    padding: 15px;
                }
                .otp {
                    font-size: 20px;
                }
                .button {
                    padding: 8px 16px;
                    font-size: 14px;
                }
            }
        </style>
    </head>
<body>
        <div class="container">
            <div class="header">
                <!-- Replace with your app's logo -->
                <a href="#" class="flex items-center gap-2 font-medium"><div class="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gallery-vertical-end size-4"><path d="M7 2h10"></path><path d="M5 6h14"></path><rect width="18" height="12" x="3" y="10" rx="2"></rect></svg></div>AutoGram.</a>
            </div>
            <div class="content">
                <h2>Reset Your Password</h2>
                <p>We received a request to reset your password for your AutoGram account. Please use the OTP below to reset your password.</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for <strong>10 minutes</strong>.</p>
                <p>If you did not request to reset your password, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                &copy; ${new Date().getFullYear()} AutoGram. All rights reserved.<br>
                Chembur, Mumbai
            </div>
        </div>
    </body>
    </html>
    `;
    await sendMail(process.env.NODEMAILER_GMAIL_USER as string, email, subject, html);
}