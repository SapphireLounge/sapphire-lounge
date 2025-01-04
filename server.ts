import express, { RequestHandler } from 'express';
import { createServer as createViteServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Array of mobile device identifiers
const MOBILE_AGENTS = [
  /Android/i,
  /webOS/i,
  /iPhone/i,
  /iPad/i,
  /iPod/i,
  /BlackBerry/i,
  /Windows Phone/i
];

// Function to check if user agent is mobile
function isMobile(userAgent: string) {
  return MOBILE_AGENTS.some((regex) => regex.test(userAgent));
}

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  // Device detection middleware
  const deviceDetectionMiddleware: RequestHandler = (req, res, next) => {
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = isMobile(userAgent);
    res.setHeader('x-device-type', isMobileDevice ? 'mobile' : 'desktop');
    next();
  };

  app.use(deviceDetectionMiddleware);

  // Use vite's connect instance as middleware
  app.use(vite.middlewares);

  // Serve static files
  app.use(express.static(path.resolve(__dirname, 'dist')));

  const port = process.env.PORT || 5173;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

createServer();
