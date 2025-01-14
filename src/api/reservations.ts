import { Router, Request, Response } from 'express';

export interface ReservationData {
  date: string;
  time: string;
  name: string;
  phone: string;
  guests: number;
  tablePreference?: string;
  occasion?: string;
  specialRequests?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  data?: {
    reservation: {
      date: string;
      time: string;
      name: string;
      phone: string;
      guests: number;
      tablePreference?: string;
      occasion?: string;
      specialRequests?: string;
    };
    qrCode: string;
  };
  error?: string;
  details?: unknown;
}

const router = Router();

router.post('/reservations', async (req: Request<unknown, unknown, ReservationData>, res: Response<ReservationResponse>) => {
  try {
    // Forward the request to the server-side controller
    const response = await fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error('Reservation failed');
    }

    const data = await response.json() as ReservationResponse;
    res.json(data);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
