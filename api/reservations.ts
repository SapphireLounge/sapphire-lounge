import { VercelRequest, VercelResponse } from '@vercel/node';
import { sendReservationConfirmation } from '../src/services/emailService';
import nodemailer from 'nodemailer';

// Test email configuration
const testEmailConfig = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.verify();
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      config: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER ? '(set)' : '(not set)',
          pass: process.env.EMAIL_PASS ? '(set)' : '(not set)'
        }
      }
    };
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Log request method and headers for debugging
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test email configuration first
    const emailTest = await testEmailConfig();
    if (!emailTest.success) {
      console.error('Email configuration test failed:', emailTest);
      return res.status(500).json({ 
        error: 'Email configuration error',
        details: emailTest
      });
    }

    const { date, time, name, email, phone, guests, tablePreference } = req.body;

    // Log received data for debugging
    console.log('Received reservation data:', {
      date,
      time,
      name,
      email,
      phone,
      guests,
      tablePreference
    });

    // Validate required fields
    if (!date || !time || !name || !email || !phone || !guests) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['date', 'time', 'name', 'email', 'phone', 'guests'],
        received: {
          date: !!date,
          time: !!time,
          name: !!name,
          email: !!email,
          phone: !!phone,
          guests: !!guests
        }
      });
    }

    // Send confirmation email
    await sendReservationConfirmation(
      email,
      name,
      new Date(date),
      time,
      parseInt(guests),
      tablePreference || '',
      phone
    );

    return res.status(200).json({ 
      success: true,
      message: 'Reservation confirmed successfully' 
    });
  } catch (error) {
    // Detailed error logging
    console.error('Reservation error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return res.status(500).json({ 
      error: 'Failed to process reservation',
      details: {
        message: error.message,
        type: error.name,
        env: {
          nodeEnv: process.env.NODE_ENV,
          emailConfigured: {
            user: !!process.env.EMAIL_USER,
            pass: !!process.env.EMAIL_PASS
          }
        }
      }
    });
  }
}
