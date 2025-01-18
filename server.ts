import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as net from 'net';
import reservationController from './server/src/controllers/reservationController';
import eventController from './server/src/controllers/eventController';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to check if user agent is mobile
const isMobile = (userAgent: string): boolean => {
  return /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent);
};

// Function to find an available port
const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  while (port < startPort + 100) {
    try {
      await new Promise((resolve, reject) => {
        const server = new net.Server();
        server.unref();
        server.on('error', reject);
        server.listen(port, () => {
          server.close(() => resolve(true));
        });
      });
      return port;
    } catch {
      port++;
    }
  }
  throw new Error('No available ports found');
};

const createServer = async () => {
  const app = express();
  const port = 5173;

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // API Routes
  app.post('/api/reservations', (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await reservationController.createReservation(req, res);
    } catch (err) {
      next(err);
    }
  }) as express.RequestHandler);

  app.post('/api/events', (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.body) {
      res.status(400).json({
        success: false,
        error: 'Missing request body'
      });
      return;
    }
    try {
      await eventController.registerForEvent(req, res);
    } catch (err) {
      next(err);
    }
  }) as express.RequestHandler);

  // Device detection middleware
  const deviceDetectionMiddleware: express.RequestHandler = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = isMobile(userAgent);
    res.setHeader('x-device-type', isMobileDevice ? 'mobile' : 'desktop');
    next();
  };

  app.use(deviceDetectionMiddleware);

  // Error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error' 
    });
  });

  // Use vite's connect instance as middleware
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      port: port
    },
    appType: 'spa'
  });

  app.use(vite.middlewares);

  // Serve static files
  app.use(express.static(path.resolve(__dirname, 'dist')));

  // Handle client-side routing
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      next();
      return;
    }
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

const startServer = async () => {
  try {
    await createServer();
  } catch (e) {
    console.error('Error starting server:', e);
    console.error('Stack trace:', e.stack);
    process.exit(1);
  }
};

startServer();
