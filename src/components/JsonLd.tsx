import { Helmet } from 'react-helmet-async';
import { BusinessData } from '../data/businessData';

interface JsonLdProps {
  type: 'Restaurant' | 'LocalBusiness';
  data: BusinessData;
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
