import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/reservations';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number; // Can be 0 for single person
  tablePreference?: string;
  specialOccasion?: string;
  notes?: string;
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  [key: string]: unknown;
}

export interface EventRegistrationData {
  eventId: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  notes?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export async function submitReservation(data: ReservationData) {
  try {
    // Ensure guests is included with a default of 0
    const reservationData = {
      ...data,
      guests: data.guests ?? 0
    };
    
    console.log('Submitting reservation with data:', JSON.stringify(reservationData, null, 2));
    
    const response = await api.post('', reservationData);
    console.log('Reservation submitted successfully:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error Response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to submit reservation');
    }
    throw error;
  }
}

export const getReservations = async (date?: string) => {
  try {
    const response = await api.get('', {
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
    const response = await api.put(`/${id}`, data);
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
    const response = await api.patch(`/${id}/cancel`);
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

export async function registerForEvent(data: EventRegistrationData) {
  try {
    // Ensure guests is included with a default of 0
    const eventData = {
      ...data,
      guests: data.guests ?? 0,
      status: data.status ?? 'pending'
    };
    
    console.log('Registering for event with data:', JSON.stringify(eventData, null, 2));
    
    const response = await api.post('/events/register', eventData);
    console.log('Event registration successful:', JSON.stringify(response.data, null, 2));
    return {
      success: true,
      message: 'Successfully registered for the event',
      ...response.data
    };
  } catch (error) {
    console.error('Event registration error:', error);
    if (error instanceof AxiosError) {
      console.error('API Error Response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to register for event');
    }
    throw error;
  }
}

export const submitReservationNew = async (data: ReservationData) => {
  try {
    console.log('Submitting reservation with data:', JSON.stringify(data, null, 2));
    const response = await api.post('/reservations', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('API Error Response:', error.response?.data);
      throw new Error(error.response?.data?.message || 'Failed to submit reservation');
    }
    throw error;
  }
};
