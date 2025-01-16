import QRCode from 'qrcode';
import { ReservationData } from '../types/reservations';

export async function generateReservationQRCode(reservation: ReservationData): Promise<string> {
  const reservationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const reservationData = {
    code: reservationCode,
    date: reservation.date,
    time: reservation.time,
    name: reservation.name,
    phone: reservation.phone,
    guests: reservation.guests,
    tablePreference: reservation.tablePreference,
    occasion: reservation.occasion,
    specialRequests: reservation.specialRequests,
    timestamp: new Date().toISOString()
  };

  return await QRCode.toDataURL(JSON.stringify(reservationData));
}

export async function generateEventQRCode(event: any): Promise<string> {
  const eventCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  const eventData = {
    code: eventCode,
    eventId: event.eventId,
    eventTitle: event.eventTitle,
    date: event.date,
    time: event.time,
    name: event.name,
    email: event.email,
    phone: event.phone,
    guests: event.guests,
    timestamp: new Date().toISOString()
  };

  return await QRCode.toDataURL(JSON.stringify(eventData));
}
