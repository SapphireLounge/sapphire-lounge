import QRCode from 'qrcode';

export async function generateEventQRCode(event: { 
  eventId: string; 
  eventTitle: string; 
  date: string; 
  time: string; 
  name: string; 
  email: string; 
  phone: string; 
  guests: number 
}): Promise<string> {
  // Only include essential data in the QR code
  const qrData = {
    id: event.eventId,
    t: event.eventTitle,
    d: event.date,
    tm: event.time,
    n: event.name,
    e: event.email,
    p: event.phone,
    g: event.guests,
    ts: new Date().toISOString()
  };

  // Generate QR code with higher error correction level and optimal size
  const qrOptions: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'M' as QRCode.QRCodeErrorCorrectionLevel,
    margin: 2,
    width: 256,
    color: {
      dark: '#000',
      light: '#fff'
    }
  };

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(JSON.stringify(qrData), qrOptions);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}
