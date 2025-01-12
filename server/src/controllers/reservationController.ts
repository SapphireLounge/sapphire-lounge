import { Request, Response } from 'express';
import { sendReservationConfirmation } from '../services/emailService';

interface ReservationRequest {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  tablePreference?: string;
  occasion: string;
  specialRequests: string;
}

interface IReservation {
  email: string;
  name: string;
  date: Date;
  time: string;
  guests: number;
  tablePreference?: string;  
  phone: string;           
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

async function confirmReservation(reservation: IReservation) {
  // Pass the IReservation object directly since emailService expects the same interface
  await sendReservationConfirmation(reservation);
}

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { date, time, name, email, phone, guests, tablePreference, occasion, specialRequests } = req.body as ReservationRequest;
    const reservationDate = new Date(date);

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
    if (!date || !time || !name || !email || !phone || !guests || !occasion || !specialRequests) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['date', 'time', 'name', 'email', 'phone', 'guests', 'occasion', 'specialRequests'],
        received: {
          date: !!date,
          time: !!time,
          name: !!name,
          email: !!email,
          phone: !!phone,
          guests: !!guests,
          occasion: !!occasion,
          specialRequests: !!specialRequests
        }
      });
    }

    // Log the date before parsing
    console.log('Date received:', date);

    // Validate date
    if (isNaN(reservationDate.getTime())) {
      console.log('Invalid date');
      return res.status(400).json({ 
        error: 'Invalid date format',
        received: date
      });
    }

    // Create the reservation with the proper Date object
    const reservation: IReservation = {
      email,
      name,
      date: reservationDate,  // Use the converted Date object
      time,
      guests,
      tablePreference,
      phone, 
      status: 'pending', // Default status
      createdAt: new Date(), // Current date
      updatedAt: new Date() // Current date
    };

    await confirmReservation(reservation);

    // TODO: Store reservation in database
    // For now, just return success response
    return res.status(200).json({ 
      success: true,
      message: 'Reservation confirmed successfully',
      details: {
        email: reservation.email,
        name: reservation.name,
        date: reservation.date.toISOString(),
        time: reservation.time,
        guests: reservation.guests,
        phone: reservation.phone,
        occasion: occasion ?? '',
        specialRequests: specialRequests ?? ''
      }
    });
  } catch (error) {
    console.error('Reservation error:', {
      message: (error as Error).message,
      stack: (error as Error).stack,
      name: (error as Error).name
    });
    console.error('Error details:', error);
    return res.status(500).json({ 
      error: 'Failed to process reservation',
      details: {
        message: (error as Error).message,
        type: (error as Error).name
      }
    });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    // TODO: Implement fetching reservations from database
    res.status(200).json({ message: 'Get reservations endpoint' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Implement updating reservation in database
    res.status(200).json({ message: `Update reservation ${id} endpoint` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reservation' });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Implement canceling reservation in database
    res.status(200).json({ message: `Cancel reservation ${id} endpoint` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel reservation' });
  }
};
