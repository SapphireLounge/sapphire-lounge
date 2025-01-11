import { Router } from 'express';
import { sendReservationConfirmation } from '../services/emailService';

const router = Router();

router.post('/api/reservations', async (req, res) => {
  try {
    const { date, time, name, email, phone, guests, tablePreference } = req.body;

    // TODO: Add validation and database storage logic here

    // Send confirmation email
    await sendReservationConfirmation(
      email,
      name,
      new Date(date),
      time,
      parseInt(guests),
      tablePreference,
      phone
    );

    res.status(200).json({ message: 'Reservation confirmed successfully' });
  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ error: 'Failed to process reservation' });
  }
});

export default router;
