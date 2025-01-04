import { toast } from 'react-hot-toast';
import api from '@/services/api';
import {
  ReservationData,
  ReservationResponse,
  LoyaltySubscriptionData,
  LoyaltyResponse,
  ContactData,
  EventRegistrationData,
  EventResponse,
  ErrorResponse
} from '@/types/api';

type ContactResponse = {
  success: boolean;
  message: string;
};

export const handleReservation = async (data: ReservationData): Promise<ReservationResponse | ErrorResponse> => {
  try {
    const response = await api.reservations.create(data);
    if (response.success) {
      toast.success(response.message);
      return response as ReservationResponse;
    }
    throw new Error('Reservation failed');
  } catch (error) {
    toast.error('Failed to make reservation. Please try again.');
    return { success: false, error: error instanceof Error ? error : new Error('An unknown error occurred') };
  }
};

export const handleLoyaltySubscription = async (data: LoyaltySubscriptionData): Promise<LoyaltyResponse | ErrorResponse> => {
  try {
    const response = await api.loyalty.subscribe(data);
    if (response.success) {
      toast.success(response.message);
      return response as LoyaltyResponse;
    }
    throw new Error('Subscription failed');
  } catch (error) {
    toast.error('Failed to process subscription. Please try again.');
    return { success: false, error: error instanceof Error ? error : new Error('An unknown error occurred') };
  }
};

export const handleNewsletterSubscription = async (email: string): Promise<{ success: boolean; data?: { success: boolean; message: string }; error?: Error }> => {
  try {
    const response = await api.newsletter.subscribe(email);
    if (response.success) {
      toast.success(response.message);
      return { success: true, data: response };
    }
    throw new Error('Newsletter subscription failed');
  } catch (error) {
    toast.error('Failed to subscribe to newsletter. Please try again.');
    return { success: false, error: error instanceof Error ? error : new Error('An unknown error occurred') };
  }
};

export const handleContactSubmission = async (data: ContactData): Promise<{ success: boolean; data?: ContactResponse; error?: Error }> => {
  try {
    const response = await api.contact.send(data);
    if (response.success) {
      toast.success(response.message);
      return { success: true, data: response };
    }
    throw new Error('Failed to send message');
  } catch (error) {
    toast.error('Failed to send message. Please try again.');
    return { success: false, error: error instanceof Error ? error : new Error('An unknown error occurred') };
  }
};

export const handleEventRegistration = async (eventId: number, data: EventRegistrationData): Promise<EventResponse | ErrorResponse> => {
  try {
    const response = await api.events.register(eventId, data);
    if (response.success) {
      toast.success(response.message);
      return response as EventResponse;
    }
    throw new Error('Event registration failed');
  } catch (error) {
    toast.error('Failed to register for event. Please try again.');
    return { success: false, error: error instanceof Error ? error : new Error('An unknown error occurred') };
  }
};
