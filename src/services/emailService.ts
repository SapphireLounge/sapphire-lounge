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
    // Check if API key is set
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SendGrid API key is not set in environment variables');
      return false;
    }

    console.log('Attempting to verify SendGrid connection...');
    await transporter.verify();
    console.log('SendGrid connection verified successfully');
    return true;
  } catch (error) {
    console.error('SendGrid connection error:', {
      message: (error as Error).message,
      name: (error as Error).name,
      stack: (error as Error).stack,
      code: (error as { code?: string }).code
    });
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
    // Log attempt to send email
    console.log('Attempting to send reservation confirmation email to:', customerEmail);
    
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

export const sendEventConfirmation = async ({
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
}) => {
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
