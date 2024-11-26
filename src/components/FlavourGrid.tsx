import React from 'react';
import { FlavourCard } from './FlavourCard';

const flavours = [
  {
    name: 'Double Apple',
    description: 'A perfect blend of red and green apples, creating a sweet and refreshing experience.',
    image: '/images/flavours/double-apple.jpg',
    strength: 'Medium',
    price: '$24.99'
  },
  {
    name: 'Mint Chill',
    description: 'Cool and refreshing mint flavour with an icy finish.',
    image: '/images/flavours/mint.jpg',
    strength: 'Strong',
    price: '$24.99'
  },
  {
    name: 'Berry Mix',
    description: 'A delightful mixture of strawberries, blueberries, and raspberries.',
    image: '/images/flavours/berry-mix.jpg',
    strength: 'Light',
    price: '$26.99'
  },
  {
    name: 'Blue Mist',
    description: 'Our signature blend with a mysterious and refreshing taste.',
    image: '/images/flavours/blue-mist.jpg',
    strength: 'Medium',
    price: '$29.99'
  }
] as const;

export function FlavourGrid() {
  return (
    <section className="py-16 bg-dark-400">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
          Premium Flavours
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Discover our carefully curated selection of premium shisha flavours, each crafted to provide a unique and memorable experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flavours.map((flavour) => (
            <FlavourCard key={flavour.name} {...flavour} />
          ))}
        </div>
      </div>
    </section>
  );
}
