import { VercelRequest, VercelResponse } from '@vercel/node';
import { sendReservationConfirmation } from '../src/services/emailService';
import QRCode from 'qrcode';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function generateQRCode(reservationData: any) {
  // Create a unique reservation code
  const reservationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Create reservation data
  const qrData = {
    code: reservationCode,
    type: 'reservation',
    ...reservationData,
    timestamp: new Date().toISOString()
  };

  // Generate QR code
  try {
    return await QRCode.toDataURL(JSON.stringify(qrData));
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Log request method and headers for debugging
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, time, name, email, phone, guests, tablePreference, occasion, specialRequests } = req.body;

    // Log received data for debugging
    console.log('Received reservation data:', {
      date,
      time,
      name,
      email,
      phone,
      guests,
      tablePreference,
      occasion,
      specialRequests
    });

    // Log environment check
    console.log('Checking environment variables:', {
      hasSendGridKey: !!process.env.SENDGRID_API_KEY,
      nodeEnv: process.env.NODE_ENV
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

    // Generate QR code
    const qrCodeDataURL = await generateQRCode({
      date,
      time,
      name,
      email,
      phone,
      guests: parseInt(guests),
      tablePreference,
      occasion,
      specialRequests
    });

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
      message: 'Reservation confirmed successfully',
      data: {
        reservation: {
          date: new Date(date),
          time,
          name,
          email,
          phone,
          guests: parseInt(guests),
          tablePreference,
          occasion,
          specialRequests
        },
        qrCode: qrCodeDataURL
      }
    });
  } catch (error) {
    console.error('Reservation error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    console.error('Error details:', error);
    return res.status(500).json({ 
      error: 'Failed to process reservation',
      details: {
        message: error.message,
        type: error.name
      }
    });
  }
}
