import { VercelRequest, VercelResponse } from '@vercel/node';
import QRCode from 'qrcode';

async function generateQRCode(eventData: any) {
  // Create a unique event code
  const eventCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Create event data
  const qrData = {
    code: eventCode,
    type: 'event',
    ...eventData,
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
  // Log request method and headers for debugging
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventTitle, date, time, name, email, phone, guests } = req.body;

    // Log received data for debugging
    console.log('Received event data:', {
      eventTitle,
      date,
      time,
      name,
      email,
      phone,
      guests
    });

    // Validate required fields
    if (!eventTitle || !date || !time || !name || !email || !phone || !guests) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['eventTitle', 'date', 'time', 'name', 'email', 'phone', 'guests'],
        received: {
          eventTitle: !!eventTitle,
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
      eventTitle,
      date,
      time,
      name,
      email,
      phone,
      guests: parseInt(guests)
    });

    return res.status(200).json({
      success: true,
      message: 'Event registration successful',
      data: {
        event: {
          eventTitle,
          date: new Date(date),
          time,
          name,
          email,
          phone,
          guests: parseInt(guests)
        },
        qrCode: qrCodeDataURL
      }
    });
  } catch (error) {
    console.error('Event registration error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    console.error('Error details:', error);
    return res.status(500).json({
      error: 'Failed to process event registration',
      details: {
        message: error.message,
        type: error.name
      }
    });
  }
}
