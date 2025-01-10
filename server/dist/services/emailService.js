"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNewsletterConfirmation = exports.sendAdminNotification = exports.sendReservationConfirmation = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../utils/logger");
const transporter = nodemailer_1.default.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendReservationConfirmation = async (reservation) => {
    try {
        const { email, name, date, time, guests } = reservation;
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Sapphire Lounge - Reservation Confirmation',
            html: `
        <h2>Thank you for your reservation, ${name}!</h2>
        <p>We're excited to welcome you to Sapphire Lounge.</p>
        <h3>Reservation Details:</h3>
        <ul>
          <li>Date: ${formattedDate}</li>
          <li>Time: ${time}</li>
          <li>Number of Guests: ${guests}</li>
        </ul>
        <p>Please note that reservations are held for 30 minutes past the booking time.</p>
        <p>If you need to make any changes to your reservation, please contact us directly.</p>
        <br>
        <p>Best regards,</p>
        <p>The Sapphire Lounge Team</p>
      `
        });
        logger_1.logger.info(`Reservation confirmation email sent to ${email}`);
    }
    catch (error) {
        logger_1.logger.error('Error sending reservation confirmation email:', error);
        throw new Error('Failed to send confirmation email');
    }
};
exports.sendReservationConfirmation = sendReservationConfirmation;
const sendAdminNotification = async (reservation) => {
    try {
        const { name, email, phone, date, time, guests, tablePreference, notes } = reservation;
        const formattedDate = new Date(date).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to admin email
            subject: 'New Reservation - Sapphire Lounge',
            html: `
        <h2>New Reservation Received</h2>
        <h3>Customer Details:</h3>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <h3>Reservation Details:</h3>
        <ul>
          <li>Date: ${formattedDate}</li>
          <li>Time: ${time}</li>
          <li>Number of Guests: ${guests}</li>
          <li>Table Preference: ${tablePreference || 'None'}</li>
          <li>Special Notes: ${notes || 'None'}</li>
        </ul>
      `
        });
        logger_1.logger.info(`Admin notification email sent for reservation by ${name}`);
    }
    catch (error) {
        logger_1.logger.error('Error sending admin notification email:', error);
        throw new Error('Failed to send admin notification');
    }
};
exports.sendAdminNotification = sendAdminNotification;
const sendNewsletterConfirmation = async (email) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Sapphire Lounge Newsletter!',
            html: `
        <h2>Welcome to Sapphire Lounge Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with:</p>
        <ul>
          <li>Special offers and promotions</li>
          <li>New menu items and seasonal specials</li>
          <li>Exclusive events and entertainment</li>
          <li>Behind-the-scenes content</li>
        </ul>
        <p>Stay tuned for our upcoming updates!</p>
        <br>
        <p>Best regards,</p>
        <p>The Sapphire Lounge Team</p>
        <p style="font-size: 12px; color: #666;">
          If you didn't subscribe to our newsletter, please ignore this email.
        </p>
      `
        });
        logger_1.logger.info(`Newsletter confirmation email sent to ${email}`);
    }
    catch (error) {
        logger_1.logger.error('Error sending newsletter confirmation email:', error);
        throw new Error('Failed to send newsletter confirmation email');
    }
};
exports.sendNewsletterConfirmation = sendNewsletterConfirmation;
