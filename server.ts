import express from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors';
import http from 'http';
import { WebSocketServer } from 'ws';
import bodyParser from 'body-parser';
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
        const server = new http.Server();
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

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  
  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://sapphirelounge.com' 
      : 'http://localhost:5173',
    credentials: true
  }));
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // Add debugging middleware
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Create Vite server
  const vite = await createViteServer({
    server: { 
      middlewareMode: true 
    },
    appType: 'spa'
  });

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // Create WebSocket server
  const wss = new WebSocketServer({ 
    server,
    path: '/ws'
  });

  wss.on('connection', (ws) => {
    console.log('WebSocket client connected');
    
    ws.on('error', console.error);
    
    ws.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  // API routes
  app.post('/api/reservations', (async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
      await reservationController.createReservation(req, res);
    } catch (err) {
      next(err);
    }
  }) as express.RequestHandler);

  app.post('/api/events', (async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
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

  // Serve static files from the dist directory in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(resolve(__dirname, 'dist')));
  }

  // Handle all routes for SPA
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    
    try {
      if (process.env.NODE_ENV === 'production') {
        res.sendFile(resolve(__dirname, 'dist', 'index.html'));
      } else {
        let template = await vite.transformIndexHtml(url, '');
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      }
    } catch (e) {
      const err = e as Error;
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });

  // Error handling middleware
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Server error:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error' 
    });
  });

  const port = process.env.PORT || 5173;
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
