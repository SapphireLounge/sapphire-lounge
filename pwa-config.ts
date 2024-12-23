import { VitePWAOptions } from 'vite-plugin-pwa';

export const pwaConfiguration: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
  manifest: {
    name: 'Sapphire Lounge',
    short_name: 'Sapphire',
    description: 'Premium shisha experience in Swansea',
    theme_color: '#020B18',
    background_color: '#020B18',
    display: 'standalone',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    start_url: '/',
    orientation: 'portrait'
  }
};
