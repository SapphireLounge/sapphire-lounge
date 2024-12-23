import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = 'Sapphire Lounge - Premium Shisha Experience',
  description = 'Experience the finest flavours in an atmosphere of luxury and comfort at Sapphire Lounge. Premium shisha, exclusive events, and exceptional service.',
  keywords = ['shisha lounge', 'premium shisha', 'hookah bar', 'luxury lounge', 'sapphire lounge'],
  image = '/images/logo/Sapphire Lounge Circle Logo.png',
  url = 'https://sapphirelounge.com',
  type = 'website'
}: SEOProps) {
  const siteTitle = title.includes('Sapphire Lounge') ? title : `${title} | Sapphire Lounge`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#050D1A" />
      
      {/* Language and Direction */}
      <html lang="en" dir="ltr" />

      {/* Favicon Links */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
    </Helmet>
  );
}
