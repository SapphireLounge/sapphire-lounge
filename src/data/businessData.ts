interface PostalAddress {
  '@type': 'PostalAddress';
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

interface GeoCoordinates {
  '@type': 'GeoCoordinates';
  latitude: string;
  longitude: string;
}

interface OpeningHoursSpecification {
  '@type': 'OpeningHoursSpecification';
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface BusinessData {
  name: string;
  image: string;
  description: string;
  address: PostalAddress;
  geo: GeoCoordinates;
  url: string;
  telephone?: string;
  priceRange?: string;
  openingHoursSpecification?: OpeningHoursSpecification[];
}

export const businessJsonLd: BusinessData = {
  name: 'Sapphire Lounge',
  image: '/images/sapphire-lounge.jpg',
  description: 'Premium shisha lounge in Swansea offering luxury flavors and a sophisticated atmosphere',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Example Street',
    addressLocality: 'Swansea',
    addressRegion: 'Wales',
    postalCode: 'SA1 1AA',
    addressCountry: 'UK'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '51.6214',
    longitude: '-3.9436'
  },
  url: 'https://sapphirelounge.co.uk',
  telephone: '+44 1234567890',
  priceRange: '££',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '12:00',
      closes: '23:00'
    }
  ]
};
