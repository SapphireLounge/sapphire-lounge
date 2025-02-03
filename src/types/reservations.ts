export interface ReservationData {
  date: string | null;
  time: string;
  name: string;
  phone: string;
  email: string;
  guests: number;
  tablePreference: string;
  occasion: string;
  specialRequests?: string;
  notes?: string;
  qrCode?: string;
  timestamp?: string;
}

export interface ReservationResponse {
  success: boolean;
  message: string;
  data?: {
    reservation: ReservationData;
  };
}
