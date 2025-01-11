import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as net from 'net';
import reservationRoutes from './src/api/reservations';
import eventRoutes from './src/api/events';

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
  const port = await findAvailablePort(3000);  // Start looking for ports from 3000

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // API Routes
  const apiRouter = express.Router();
  
  apiRouter.post('/newsletter', async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
      return;
    }
    // In a real app, you would add email to a database or newsletter service
    res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });
  });

  app.use(reservationRoutes);
  app.use(eventRoutes);

  // Mount the API router
  app.use('/api', apiRouter);

  // Device detection middleware
  const deviceDetectionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = isMobile(userAgent);
    res.setHeader('x-device-type', isMobileDevice ? 'mobile' : 'desktop');
    next();
  };

  app.use(deviceDetectionMiddleware);

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
    console.error(e);
    process.exit(1);
  }
};

startServer();
