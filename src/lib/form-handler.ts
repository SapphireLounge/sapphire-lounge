import { toast } from 'react-hot-toast';
import { submitReservation as apiSubmitReservation, subscribeNewsletter, registerForEvent } from './api-client';
import type { ReservationData } from './api-client';
import type { ReservationFormData } from './validations';
import type { EventRegistrationFormData } from './validations/event';

// Event mapping for converting titles to IDs
const eventMap = {
  "Flavour Tasting Night": 1,
  "DJ Night": 2,
  "Student Night": 3
};

export interface FormResponse {
  success: boolean;
  message: string;
}

export async function handleFormSubmission(
  endpoint: 'reservations' | 'contact' | 'newsletter' | 'events',
  data: ReservationFormData | EventRegistrationFormData | Record<string, unknown>
): Promise<FormResponse> {
  try {
    let response;

    switch (endpoint) {
      case 'reservations': {
        const formattedData = {
          ...data,
          guests: Number((data as ReservationFormData).guests || 0)
        };
        console.log('Formatted reservation data:', formattedData);
        response = await apiSubmitReservation(formattedData as ReservationData);
        break;
      }
      case 'contact':
        // TODO: Implement contact form submission
        throw new Error('Contact form submission not implemented');
      case 'newsletter':
        response = await subscribeNewsletter(data.email as string);
        break;
      case 'events': {
        // Use the dedicated event registration endpoint
        const eventData = data as EventRegistrationFormData;
        const eventId = eventMap[eventData.eventChoice as keyof typeof eventMap];
        
        if (!eventId) {
          throw new Error('Invalid event selection');
        }

        console.log('Submitting event registration:', { ...eventData, eventId });
        response = await registerForEvent({
          eventId,
          name: eventData.name,
          email: eventData.email,
          phone: eventData.phone,
          guests: Number(eventData.guests),
          notes: eventData.notes
        });
        break;
      }
      default:
        throw new Error('Invalid endpoint');
    }

    if (!response) {
      throw new Error('No response from server');
    }

    return {
      success: true,
      message: response.message || 'Submission successful',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    toast.error(message);
    return {
      success: false,
      message,
    };
  }
}
