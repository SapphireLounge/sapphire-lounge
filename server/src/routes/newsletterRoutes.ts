import { Router } from 'express';
import { subscribeToNewsletter } from '../controllers/newsletterController';

const router = Router();

router.post('/subscribe', subscribeToNewsletter as any); // TODO: Add proper type definition

export default router;
