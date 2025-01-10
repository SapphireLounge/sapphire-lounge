import { mockApi } from './mock';

// In development, use mock API
// In production, this would be replaced with real API calls
export const api = process.env.NODE_ENV === 'development' ? mockApi : mockApi;

export default api;
