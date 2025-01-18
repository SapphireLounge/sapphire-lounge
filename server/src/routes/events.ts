import { Router } from 'express';
import { registerForEvent } from '../controllers/eventController';

const router = Router();

router.post('/register', registerForEvent as any); // TODO: Add proper type definition

export const eventRoutes = router;
