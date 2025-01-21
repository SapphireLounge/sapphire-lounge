import QRCode, { QRCodeToDataURLOptions } from 'qrcode';
import { ReservationData } from '../types/reservations';

interface ReservationResponse {
  success: boolean;
  message: string;
  data: {
    reservation: ReservationData & { qrCode: string; };
  };
}

export async function generateReservationQRCode(reservation: ReservationData): Promise<string> {
  const reservationCode = Math.random().toString(36).substring(2, 8);
  
  // Only include essential data in the QR code
  const qrData = {
    c: reservationCode,
    d: reservation.date,
    t: reservation.time,
    n: reservation.name,
    g: reservation.guests,
    p: reservation.phone,
    ts: new Date().toISOString().split('T')[0]
  };

  // Generate QR code with higher error correction level
  const qrOptions: QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 256
  };

  return QRCode.toDataURL(JSON.stringify(qrData), qrOptions);
}

export async function submitReservation(reservation: ReservationData): Promise<ReservationResponse> {
    try {
        const qrCode = await generateReservationQRCode(reservation);
        
        // Add a 1-second delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
            success: true,
            message: 'Reservation submitted successfully',
            data: {
                reservation: {
                    ...reservation,
                    qrCode: qrCode
                }
            }
        };
    } catch (error) {
        console.error('QR Code generation error:', error);
        throw new Error('Failed to generate reservation QR code. Please try again.');
    }
}

export async function generateEventQRCode(event: { eventId: string; eventTitle: string; date: string; time: string; name: string; email: string; phone: string; guests: number }): Promise<string> {
  const eventCode = Math.random().toString(36).substring(2, 8);
  
  // Only include essential data in the QR code
  const qrData = {
    c: eventCode,
    e: event.eventId,
    t: event.eventTitle,
    d: event.date,
    tm: event.time,
    n: event.name,
    g: event.guests,
    p: event.phone,
    ts: new Date().toISOString().split('T')[0]
  };

  // Generate QR code with higher error correction level
  const qrOptions: QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 256
  };

  return await QRCode.toDataURL(JSON.stringify(qrData), qrOptions);
}
