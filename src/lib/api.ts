import axios from 'axios';

// API Types
export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tablePreference?: string;
  notes?: string;
  qrCode?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

// API Configuration
const isDevelopment = import.meta.env.DEV;
const MOCK_DELAY = 1000;

export const api = axios.create({
  baseURL: isDevelopment 
    ? '/api'  // This will be handled by Vite's proxy
    : 'https://sapphire-lounge-hymy3oc1n-xl-uk-radios-projects.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
export async function submitReservation(data: ReservationData): Promise<ApiResponse<{ reservation: ReservationData }>> {
  try {
    const response = await api.post<ApiResponse<{ reservation: ReservationData }>>('/reservations', data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to submit reservation. Please try again later.',
    };
  }
}

export async function getReservations(date?: string): Promise<ApiResponse<ReservationData[]>> {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      success: true,
      message: 'Reservations retrieved successfully',
      data: [],
    };
  }

  try {
    const response = await api.get<ApiResponse<ReservationData[]>>('/reservations', {
      params: { date },
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch reservations. Please try again later.',
    };
  }
}

export async function updateReservation(
  id: string,
  data: Partial<ReservationData>
): Promise<ApiResponse<ReservationData>> {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      success: true,
      message: 'Reservation updated successfully',
      data: {
        name: 'Mock User',
        email: 'mock@example.com',
        phone: '123-456-7890',
        date: '2025-01-14',
        time: '19:00',
        guests: 2,
      },
    };
  }

  try {
    const response = await api.put<ApiResponse<ReservationData>>(`/reservations/${id}`, data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update reservation. Please try again later.',
    };
  }
}

export async function cancelReservation(id: string): Promise<ApiResponse> {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      success: true,
      message: 'Reservation cancelled successfully',
    };
  }

  try {
    const response = await api.delete<ApiResponse>(`/reservations/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to cancel reservation. Please try again later.',
    };
  }
}

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data,
    };
  }

  try {
    const response = await api.post<ApiResponse>('/contact', data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
    };
  }
}

export async function subscribeNewsletter(email: string): Promise<ApiResponse> {
  if (isDevelopment) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
    return {
      success: true,
      message: 'Successfully subscribed to newsletter!',
    };
  }

  try {
    const response = await api.post<ApiResponse>('/newsletter/subscribe', { email });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again later.',
    };
  }
}
