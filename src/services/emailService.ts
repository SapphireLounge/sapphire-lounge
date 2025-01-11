import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendReservationConfirmation = async (
  to: string,
  name: string,
  date: Date,
  time: string,
  guests: number,
  tablePreference: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reservation Confirmation - Sapphire Lounge',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4A90E2;">Reservation Confirmed!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for choosing Sapphire Lounge. Your reservation has been confirmed:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
          <p><strong>Table Preference:</strong> ${tablePreference}</p>
        </div>
        <p>We look forward to providing you with an exceptional experience.</p>
        <p>Best regards,<br>Sapphire Lounge Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendEventBookingConfirmation = async (
  to: string,
  name: string,
  eventName: string,
  date: Date,
  guests: number
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Event Booking Confirmation - Sapphire Lounge',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4A90E2;">Event Booking Confirmed!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for booking with Sapphire Lounge. Your event booking has been confirmed:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Event:</strong> ${eventName}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
        </div>
        <p>We're excited to host your event and ensure it's a memorable experience.</p>
        <p>Best regards,<br>Sapphire Lounge Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendNewsletterConfirmation = async (to: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Newsletter Subscription Confirmed - Sapphire Lounge',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4A90E2;">Welcome to Sapphire Lounge Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll now receive updates about:</p>
        <ul>
          <li>Special events and performances</li>
          <li>Exclusive offers and promotions</li>
          <li>New menu items and seasonal specials</li>
          <li>VIP experiences and packages</li>
        </ul>
        <p>Stay tuned for our next update!</p>
        <p>Best regards,<br>Sapphire Lounge Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
