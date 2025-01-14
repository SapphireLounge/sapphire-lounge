import { Request, Response } from 'express';
import QRCode from 'qrcode';

interface EventRequest {
  eventTitle: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
}

async function generateQRCode(eventData: EventRequest) {
  // Create a unique event code
  const eventCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // Create event data
  const qrData = {
    code: eventCode,
    type: 'event',
    eventTitle: eventData.eventTitle,
    date: eventData.date,
    time: eventData.time,
    name: eventData.name,
    email: eventData.email,
    phone: eventData.phone,
    guests: eventData.guests,
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

export const registerForEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const eventData = req.body as EventRequest;
    
    // Validate required fields
    const requiredFields = ['eventTitle', 'date', 'time', 'name', 'email', 'phone', 'guests'];
    const missingFields = requiredFields.filter(field => !eventData[field as keyof EventRequest]);
    
    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields.join(', '));
      return res.status(400).json({ 
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate guests is a number
    if (typeof eventData.guests !== 'number' || isNaN(eventData.guests)) {
      console.log('Invalid number of guests:', eventData.guests);
      return res.status(400).json({
        success: false,
        error: 'Number of guests must be a valid number'
      });
    }

    // Generate QR code
    const qrCodeDataURL = await generateQRCode(eventData);

    // Return success response with QR code
    console.log('Event registration successful:', eventData);
    return res.status(201).json({
      success: true,
      message: 'Event registration successful',
      data: {
        event: eventData,
        qrCode: qrCodeDataURL
      }
    });

  } catch (error) {
    console.error('Event registration error:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process event registration'
    });
  }

  // Default return statement to handle unexpected cases
  return res.status(500).json({
    success: false,
    error: 'Unexpected error occurred'
  });
};

const eventController = {
  registerForEvent
};

export default eventController;