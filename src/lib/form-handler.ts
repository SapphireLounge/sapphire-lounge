import { toast } from 'react-hot-toast';
import { ReservationFormData } from './validations';
import api from '@/services/api';

export const handleFormSubmission = async (data: ReservationFormData) => {
  try {
    const response = await api.reservations.create(data);
    
    if (response.success) {
      toast.success('Reservation submitted successfully!');
      return true;
    } else {
      toast.error('Failed to submit reservation. Please try again.');
      return false;
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    toast.error('An error occurred. Please try again later.');
    return false;
  }
};
