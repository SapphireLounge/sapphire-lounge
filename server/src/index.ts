import express from 'express';
import dotenv from 'dotenv';
import { reservationRoutes } from './routes/reservations';
import newsletterRoutes from './routes/newsletterRoutes';
import { eventRoutes } from './routes/events';
import { errorHandler } from './middleware/errorHandler';
import { corsMiddleware } from './middleware/cors';
import { logger } from './utils/logger';
import connectDB from './config/database';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/events', eventRoutes);

// Error handling
app.use(errorHandler);

// Connect to MongoDB
connectDB().catch((error) => {
  logger.error('Failed to connect to MongoDB:', error);
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
