import { VercelRequest, VercelResponse } from '@vercel/node';
import { sendReservationConfirmation } from '../src/services/emailService';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { date, time, name, email, phone, guests, tablePreference } = req.body;

    // Validate required fields
    if (!date || !time || !name || !email || !phone || !guests) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['date', 'time', 'name', 'email', 'phone', 'guests']
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
    console.error('Reservation error:', error);
    return res.status(500).json({ 
      error: 'Failed to process reservation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
