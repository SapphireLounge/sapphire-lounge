import { toast } from 'react-hot-toast';
import { submitReservation as apiSubmitReservation, subscribeNewsletter } from './api-client';
import type { ReservationData } from './api-client';
import type { ReservationFormData } from './validations';

export interface FormResponse {
  success: boolean;
  message: string;
}

export async function handleFormSubmission(
  endpoint: 'reservations' | 'contact' | 'newsletter',
  data: ReservationFormData | Record<string, unknown>
): Promise<FormResponse> {
  try {
    let response;

    switch (endpoint) {
      case 'reservations':
        response = await apiSubmitReservation(data as ReservationData);
        break;
      case 'contact':
        // TODO: Implement contact form submission
        throw new Error('Contact form submission not implemented');
      case 'newsletter':
        response = await subscribeNewsletter(data.email as string);
        break;
      default:
        throw new Error('Invalid endpoint');
    }

    toast.success(response.message || 'Submission successful!');
    return { success: true, message: response.message };
  } catch (error: any) {
    const errorMessage = error.message || 'An error occurred. Please try again.';
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
}
