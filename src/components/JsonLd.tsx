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

export const businessJsonLd = {
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
  url: 'https://sapphirelounge.vercel.app',
  telephone: '+44 1234567890',
  priceRange: '££',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '16:00',
      closes: '23:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '16:00',
      closes: '00:00'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '16:00',
      closes: '22:00'
    }
  ]
};
