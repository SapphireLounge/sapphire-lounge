import { LoyaltyTier } from '../types/loyalty';

export const loyaltyTiers: LoyaltyTier[] = [
  {
    id: 'sapphire',
    name: 'Sapphire',
    price: 29.99,
    benefits: [
      'Priority Reservations',
      'Member-Only Events',
      '10% Off Food & Drinks',
      'Welcome Gift'
    ],
    features: [
      { description: 'Priority Seating', included: true },
      { description: 'VIP Event Access', included: true },
      { description: 'Exclusive Discounts', included: true },
      { description: 'Private Room Access', included: false },
      { description: 'Personal Concierge', included: false }
    ]
  },
  {
    id: 'ruby',
    name: 'Ruby',
    price: 49.99,
    benefits: [
      'All Sapphire Benefits',
      'Private Room Access',
      '20% Off Food & Drinks',
      'Complimentary Birthday Package'
    ],
    features: [
      { description: 'Priority Seating', included: true },
      { description: 'VIP Event Access', included: true },
      { description: 'Exclusive Discounts', included: true },
      { description: 'Private Room Access', included: true },
      { description: 'Personal Concierge', included: false }
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 99.99,
    benefits: [
      'All Ruby Benefits',
      'Personal Concierge',
      '30% Off Food & Drinks',
      'Complimentary Valet Parking',
      'Priority Event Tickets'
    ],
    features: [
      { description: 'Priority Seating', included: true },
      { description: 'VIP Event Access', included: true },
      { description: 'Exclusive Discounts', included: true },
      { description: 'Private Room Access', included: true },
      { description: 'Personal Concierge', included: true }
    ]
  }
];
