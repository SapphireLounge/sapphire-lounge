import {
  ReservationData,
  ReservationResponse,
  LoyaltySubscriptionData,
  LoyaltyResponse,
  ContactData,
  EventRegistrationData,
  EventResponse,
  ApiResponse
} from '@/types/api';

// Mock API responses
export const mockApi = {
  reservations: {
    create: async (data: ReservationData): Promise<ReservationResponse> => {
      console.log('Mock API: Creating reservation', data);
      return {
        success: true,
        id: 'mock-reservation-' + Date.now(),
        message: 'Reservation created successfully! We\'ll send you a confirmation email shortly.'
      };
    },
    get: async (id: string): Promise<ReservationData & { id: string; status: string; message: string }> => {
      console.log('Mock API: Getting reservation', id);
      return {
        id,
        status: 'confirmed',
        date: new Date().toISOString(),
        time: '19:00',
        guests: 2,
        name: 'Mock User',
        email: 'mock@example.com',
        phone: '1234567890',
        message: 'Your reservation is confirmed'
      };
    }
  },

  loyalty: {
    subscribe: async (data: LoyaltySubscriptionData): Promise<LoyaltyResponse> => {
      console.log('Mock API: Processing loyalty subscription', data);
      return {
        success: true,
        tier: data.tier,
        message: `Welcome to our ${data.tier} tier! Your exclusive benefits are now active.`,
        benefits: [
          'Priority Reservations',
          'Special Event Access',
          'Exclusive Flavors',
          'Member Discounts'
        ]
      };
    },
    getTier: async (
      // userId is unused in mock but would be required in real implementation
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _userId: string
    ): Promise<{ tier: string; points: number; nextTier: string; pointsToNext: number }> => {
      return {
        tier: 'GOLD',
        points: 1500,
        nextTier: 'PLATINUM',
        pointsToNext: 500
      };
    }
  },

  newsletter: {
    subscribe: async (email: string): Promise<ApiResponse> => {
      console.log('Mock API: Newsletter subscription', email);
      return {
        success: true,
        message: 'Successfully subscribed to newsletter!'
      };
    },
    unsubscribe: async (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _email: string
    ): Promise<ApiResponse> => {
      return {
        success: true,
        message: 'Successfully unsubscribed from newsletter.'
      };
    }
  },

  contact: {
    send: async (data: ContactData): Promise<ApiResponse> => {
      console.log('Mock API: Sending contact message', data);
      return {
        success: true,
        message: 'Message sent successfully! We\'ll get back to you soon.'
      };
    }
  },

  events: {
    list: async () => {
      return [
        {
          id: 1,
          title: 'Jazz Night',
          date: '2024-01-15',
          time: '20:00',
          description: 'An evening of smooth jazz and fine dining',
          image: '/images/events/jazz-night.jpg',
          capacity: 50,
          price: 25
        },
        // ... other events
      ];
    },
    register: async (eventId: number, data: EventRegistrationData): Promise<EventResponse> => {
      console.log('Mock API: Registering for event', { eventId, data });
      return {
        success: true,
        eventId,
        registrationId: 'mock-reg-' + Date.now(),
        message: 'Successfully registered for the event!'
      };
    }
  },

  menu: {
    list: async () => {
      return {
        categories: [
          {
            id: 'shisha',
            name: 'Premium Shisha',
            items: [
              {
                id: 1,
                name: 'Classic Mint',
                description: 'Refreshing mint flavor',
                price: 25
              },
              // ... other items
            ]
          }
        ]
      };
    }
  }
};
