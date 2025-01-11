import nodemailer from 'nodemailer';

const BUSINESS_EMAIL = 'sapphireloungeswansea@gmail.com';
const SENDER_NAME = 'Sapphire Lounge';

// Create reusable transporter object using SendGrid transport
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});

// Verify transporter configuration
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log('SendGrid connection verified successfully');
    return true;
  } catch (error) {
    console.error('SendGrid connection error:', error);
    return false;
  }
};

export const sendReservationConfirmation = async (
  customerEmail: string,
  customerName: string,
  date: Date,
  time: string,
  guests: number,
  tablePreference: string,
  phone: string
) => {
  try {
    // Verify connection before sending
    const isVerified = await verifyTransporter();
    if (!isVerified) {
      throw new Error('Failed to verify email configuration');
    }

    // Format date for email
    const formattedDate = date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send confirmation to customer
    const customerMailOptions = {
      from: `"${SENDER_NAME}" <${BUSINESS_EMAIL}>`,
      to: customerEmail,
      subject: 'Your Reservation at Sapphire Lounge',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">Reservation Confirmation</h2>
          <p>Dear ${customerName},</p>
          <p>Thank you for choosing Sapphire Lounge. Your reservation has been confirmed:</p>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Number of Guests:</strong> ${guests}</p>
            ${tablePreference ? `<p><strong>Table Preference:</strong> ${tablePreference}</p>` : ''}
          </div>
          <p>If you need to modify or cancel your reservation, please contact us at:</p>
          <p>📞 Phone: +44 7968 169885</p>
          <p>📧 Email: ${BUSINESS_EMAIL}</p>
          <p style="margin-top: 30px;">We look forward to serving you!</p>
          <p>Best regards,<br>The Sapphire Lounge Team</p>
        </div>
      `
    };

    // Send notification to business
    const businessMailOptions = {
      from: `"${SENDER_NAME} System" <${BUSINESS_EMAIL}>`,
      to: BUSINESS_EMAIL,
      subject: `New Reservation - ${customerName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e3a8a;">New Reservation Received</h2>
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Email:</strong> ${customerEmail}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Number of Guests:</strong> ${guests}</p>
            ${tablePreference ? `<p><strong>Table Preference:</strong> ${tablePreference}</p>` : ''}
          </div>
        </div>
      `
    };

    // Send both emails
    console.log('Sending confirmation email to customer...');
    await transporter.sendMail(customerMailOptions);
    console.log('Customer confirmation email sent successfully');

    console.log('Sending notification email to business...');
    await transporter.sendMail(businessMailOptions);
    console.log('Business notification email sent successfully');

  } catch (error) {
    console.error('Error sending reservation emails:', error);
    const mailError = error as Error & {
      response?: {
        body?: {
          errors?: Array<{ message: string }>;
        };
      };
    };
    
    throw new Error(
      mailError.response?.body?.errors?.[0]?.message || 
      mailError.message || 
      'Failed to send reservation emails'
    );
  }
};

export const sendEventBookingConfirmation = async (
  to: string,
  name: string,
  eventName: string,
  date: Date,
  guests: number
) => {
  const eventDetails = `
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
  `;

  // Send confirmation to customer
  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Event Booking Confirmation - Sapphire Lounge',
    html: eventDetails
  };

  // Send notification to business
  const businessMailOptions = {
    from: process.env.EMAIL_USER,
    to: BUSINESS_EMAIL,
    subject: `New Event Booking - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4A90E2;">New Event Booking Received</h1>
        <p>A new event booking has been made with the following details:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Customer Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${to}</p>
          <p><strong>Event:</strong> ${eventName}</p>
          <p><strong>Date:</strong> ${date.toLocaleDateString()}</p>
          <p><strong>Number of Guests:</strong> ${guests}</p>
        </div>
      </div>
    `
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(customerMailOptions),
    transporter.sendMail(businessMailOptions)
  ]);
};

export const sendNewsletterConfirmation = async (to: string) => {
  const newsletterDetails = `
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
  `;

  // Send confirmation to customer
  const customerMailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Newsletter Subscription Confirmed - Sapphire Lounge',
    html: newsletterDetails
  };

  // Send notification to business
  const businessMailOptions = {
    from: process.env.EMAIL_USER,
    to: BUSINESS_EMAIL,
    subject: `New Newsletter Subscription - ${to}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #4A90E2;">New Newsletter Subscription Received</h1>
        <p>A new newsletter subscription has been made with the following details:</p>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Email:</strong> ${to}</p>
        </div>
      </div>
    `
  };

  // Send both emails
  await Promise.all([
    transporter.sendMail(customerMailOptions),
    transporter.sendMail(businessMailOptions)
  ]);
};
