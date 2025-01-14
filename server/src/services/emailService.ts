import nodemailer from 'nodemailer';
import { IReservation } from '../models/Reservation';
import { logger } from '../utils/logger';

const BUSINESS_EMAIL = process.env.EMAIL_USER || '';
const SENDER_NAME = 'Sapphire Lounge';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

class EmailService {
  async sendReservationConfirmation(reservation: IReservation) {
    try {
      const { email, name, date, time, guests } = reservation;
      const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${BUSINESS_EMAIL}>`,
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

      logger.info(`Reservation confirmation email sent to ${email}`);
    } catch (error) {
      logger.error('Error sending reservation confirmation email:', error);
      throw new Error('Failed to send confirmation email');
    }
  }

  async sendEventConfirmation({
    to,
    name,
    eventTitle,
    date,
    time,
    guests,
    qrCode
  }: {
    to: string;
    name: string;
    eventTitle: string;
    date: string;
    time: string;
    guests: number;
    qrCode: string;
  }) {
    try {
      const subject = `Event Booking Confirmation - ${eventTitle}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Event Booking Confirmed!</h1>
          <p style="color: #666;">Dear ${name},</p>
          <p style="color: #666;">Your booking for ${eventTitle} has been confirmed. Here are your booking details:</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Event:</strong> ${eventTitle}</p>
            <p style="margin: 10px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 10px 0;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 10px 0;"><strong>Number of Guests:</strong> ${guests}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; margin-bottom: 15px;">Please show this QR code at the event:</p>
            <img src="${qrCode}" alt="Event QR Code" style="max-width: 200px; height: auto;"/>
          </div>

          <p style="color: #666;">Looking forward to seeing you at the event!</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              Sapphire Shisha Lounge<br/>
              123 Main Street, City<br/>
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${BUSINESS_EMAIL}>`,
        to,
        subject,
        html
      });

      logger.info(`Event confirmation email sent to ${to}`);
    } catch (error) {
      logger.error('Error sending event confirmation email:', error);
      throw new Error('Failed to send event confirmation email');
    }
  }

  async sendAdminNotification(reservation: IReservation) {
    try {
      const { name, email, date, time, guests } = reservation;
      const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${BUSINESS_EMAIL}>`,
        to: BUSINESS_EMAIL,
        subject: 'New Reservation Notification',
        html: `
          <h2>New Reservation Received</h2>
          <h3>Reservation Details:</h3>
          <ul>
            <li>Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Date: ${formattedDate}</li>
            <li>Time: ${time}</li>
            <li>Number of Guests: ${guests}</li>
          </ul>
        `
      });

      logger.info('Admin notification email sent');
    } catch (error) {
      logger.error('Error sending admin notification email:', error);
      // Don't throw error for admin notifications
    }
  }

  async sendNewsletterConfirmation(to: string) {
    try {
      const subject = 'Welcome to Sapphire Lounge Newsletter';
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Welcome to Our Newsletter!</h1>
          <p style="color: #666;">Thank you for subscribing to the Sapphire Lounge newsletter.</p>
          <p style="color: #666;">You'll now receive updates about:</p>
          <ul style="color: #666;">
            <li>Special events and performances</li>
            <li>Exclusive offers and promotions</li>
            <li>New menu items and seasonal specials</li>
            <li>Community updates and news</li>
          </ul>
          <p style="color: #666;">Stay tuned for our next update!</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px;">
              Sapphire Shisha Lounge<br/>
              123 Main Street, City<br/>
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"${SENDER_NAME}" <${BUSINESS_EMAIL}>`,
        to,
        subject,
        html
      });

      logger.info(`Newsletter confirmation email sent to ${to}`);
    } catch (error) {
      logger.error('Error sending newsletter confirmation email:', error);
      throw new Error('Failed to send newsletter confirmation email');
    }
  }
}

export const emailService = new EmailService();
