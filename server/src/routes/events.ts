import { Router } from 'express';
import { registerForEvent } from '../controllers/eventController';

const router = Router();

router.post('/register', registerForEvent);

export const eventRoutes = router;
