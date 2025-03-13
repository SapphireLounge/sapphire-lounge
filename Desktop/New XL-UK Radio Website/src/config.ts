// Environment configuration for the application
// This allows us to handle different environments (development, production, etc.)

interface AppConfig {
  apiUrl: string;
  siteUrl: string;
  streamUrl: string;
  isProduction: boolean;
}

// Default configuration
const defaultConfig: AppConfig = {
  apiUrl: '',
  siteUrl: 'https://xlukradio.com',
  streamUrl: 'https://stream.xlukradio.com/stream',
  isProduction: import.meta.env.PROD,
};

// Environment-specific overrides
const envConfig: Record<string, Partial<AppConfig>> = {
  development: {
    apiUrl: 'http://localhost:3000',
    siteUrl: 'http://localhost:5173',
    streamUrl: 'https://test-stream.xlukradio.com/stream',
  },
  production: {
    apiUrl: 'https://api.xlukradio.com',
  },
};

// Determine current environment
const environment = import.meta.env.MODE || 'development';

// Create the final config by merging default with environment-specific
const config: AppConfig = {
  ...defaultConfig,
  ...(envConfig[environment] || {}),
};

export default config;
