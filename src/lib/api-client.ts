import axios, { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tablePreference?: string;
  notes?: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
}

export const submitReservation = async (data: ReservationData) => {
  try {
    const response = await api.post('/reservations', data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to submit reservation');
    }
    throw error;
  }
};

export const getReservations = async (date?: string) => {
  try {
    const response = await api.get('/reservations', {
      params: { date },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reservations');
    }
    throw error;
  }
};

export const updateReservation = async (id: string, data: Partial<ReservationData>) => {
  try {
    const response = await api.put(`/reservations/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to update reservation');
    }
    throw error;
  }
};

export const cancelReservation = async (id: string) => {
  try {
    const response = await api.patch(`/reservations/${id}/cancel`);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to cancel reservation');
    }
    throw error;
  }
};

export const subscribeNewsletter = async (email: string): Promise<NewsletterResponse> => {
  try {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Failed to subscribe to newsletter');
    }
    throw error;
  }
};
