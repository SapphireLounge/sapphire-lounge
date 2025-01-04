// API Response Types
export interface ApiResponse {
  success: boolean;
  message: string;
}

// Reservation Types
export interface ReservationData {
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface ReservationResponse extends ApiResponse {
  id: string;
}

// Loyalty Types
interface PaymentDetails {
  cardNumber?: string;
  expiryDate?: string;
  cardholderName?: string;
  billingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface LoyaltySubscriptionData {
  tier: string;
  name: string;
  email: string;
  phone: string;
  paymentMethod: {
    type: string;
    details: PaymentDetails;
  };
}

export interface LoyaltyResponse extends ApiResponse {
  tier: string;
  benefits: string[];
}

// Contact Types
export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Event Types
export interface EventRegistrationData {
  eventId: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  specialRequests?: string;
}

export interface EventResponse extends ApiResponse {
  eventId: number;
  registrationId: string;
}

// Generic Error Response
export interface ErrorResponse {
  success: false;
  error: Error | unknown;
}
