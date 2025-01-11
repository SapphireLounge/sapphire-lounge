import { VercelRequest, VercelResponse } from '@vercel/node';
import { sendReservationConfirmation } from '../src/services/emailService';

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
      message: 'Reservation confirmed successfully',
      details: {
        email,
        name,
        date: new Date(date),
        time,
        guests: parseInt(guests),
        phone
      }
    });
  } catch (error) {
    console.error('Reservation error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });

    return res.status(500).json({ 
      error: 'Failed to process reservation',
      details: {
        message: error.message,
        type: error.name
      }
    });
  }
}
