import { Router } from 'express';
import { sendEventBookingConfirmation } from '../services/emailService';

const router = Router();

router.post('/api/events/book', async (req, res) => {
  try {
    const { eventName, date, name, email, guests } = req.body;

    // TODO: Add validation and database storage logic here

    // Send confirmation email
    await sendEventBookingConfirmation(
      email,
      name,
      eventName,
      new Date(date),
      parseInt(guests)
    );

    res.status(200).json({ message: 'Event booking confirmed successfully' });
  } catch (error) {
    console.error('Event booking error:', error);
    res.status(500).json({ error: 'Failed to process event booking' });
  }
});

export default router;
