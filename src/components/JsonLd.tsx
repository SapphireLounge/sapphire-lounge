import { Helmet } from 'react-helmet-async';

interface JsonLdProps {
  type: 'Restaurant' | 'LocalBusiness';
  data: any;
}

export function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}

export const restaurantJsonLd = {
  name: 'Sapphire Lounge',
  image: '/images/sapphire-lounge.jpg',
  description: 'Premier shisha lounge in Swansea offering premium flavors and a sophisticated atmosphere',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Your Street Address',
    addressLocality: 'Swansea',
    addressRegion: 'Wales',
    postalCode: 'Your Postal Code',
    addressCountry: 'GB'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 'YOUR_LATITUDE',
    longitude: 'YOUR_LONGITUDE'
  },
  url: 'https://sapphirelounge.com',
  telephone: 'YOUR_PHONE',
  servesCuisine: 'Middle Eastern',
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
