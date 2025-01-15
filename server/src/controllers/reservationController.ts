import { Request, Response } from 'express';
import QRCode from 'qrcode';

interface ReservationRequest {
  date: string;
  time: string;
  name: string;
  phone: string;
  guests: number;
  tablePreference?: string;
  occasion?: string;
  specialRequests?: string;
}

interface IReservation {
  name: string; 
  phone: string; 
  date: Date;
  time: string;
  guests: number;
  tablePreference?: string;
  occasion?: string; 
  specialRequests?: string; 
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

async function generateQRCode(reservation: IReservation) {
  // Create a unique reservation code
  const reservationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Create reservation data
  const reservationData = {
    code: reservationCode,
    date: reservation.date.toISOString(),
    time: reservation.time,
    name: reservation.name,
    phone: reservation.phone,
    guests: reservation.guests,
    tablePreference: reservation.tablePreference,
    occasion: reservation.occasion,
    specialRequests: reservation.specialRequests,
    timestamp: new Date().toISOString()
  };

  // Generate QR code
  const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(reservationData));

  return qrCodeDataURL;
}

export async function createReservation(req: Request, res: Response): Promise<Response> {
  try {
    const { date, time, name, phone, guests, tablePreference, occasion, specialRequests } = req.body as ReservationRequest;
    
    // Log received data for debugging
    console.log('Received reservation data:', {
      date,
      time,
      name,
      phone,
      guests,
      tablePreference,
      occasion,
      specialRequests
    });

    // Validate required fields
    if (!date || !time || !name || !phone || !guests) {
      console.log('Missing required fields');
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['date', 'time', 'name', 'phone', 'guests'],
        received: {
          date: !!date,
          time: !!time,
          name: !!name,
          phone: !!phone,
          guests: !!guests
        }
      });
    }

    // Log the date before parsing
    console.log('Date received:', date);

    // Validate date
    const reservationDate = new Date(date);
    if (isNaN(reservationDate.getTime())) {
      console.log('Invalid date');
      return res.status(400).json({ 
        error: 'Invalid date format',
        received: date
      });
    }

    // Create the reservation with the proper Date object
    const reservation: IReservation = {
      name,  
      phone,
      date: reservationDate,
      time,
      guests,
      tablePreference,
      occasion,  
      specialRequests,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const qrCodeDataURL = await generateQRCode(reservation);
      // Return success response with QR code
      return res.status(200).json({
        success: true,
        message: 'Reservation created successfully',
        data: {
          reservation: {
            date: reservation.date.toISOString(),
            time: reservation.time,
            name: reservation.name,
            phone: reservation.phone,
            guests: reservation.guests,
            tablePreference: reservation.tablePreference,
            occasion: reservation.occasion ?? '',
            specialRequests: reservation.specialRequests ?? '',
            qrCode: qrCodeDataURL
          }
        }
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to create reservation',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
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

const reservationController = {
  createReservation,
  getReservations,
  updateReservation,
  cancelReservation
};

export default reservationController;
