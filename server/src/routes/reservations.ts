import { Router } from 'express';
import { 
  createReservation, 
  getAvailability, 
  getReservations, 
  updateReservation, 
  cancelReservation 
} from '../controllers/reservationController';

const router = Router();

// Add type assertions temporarily to fix build
router.post('/', createReservation as any);
router.get('/availability', getAvailability as any);
router.get('/', getReservations);
router.put('/:id', updateReservation);
router.patch('/:id/cancel', cancelReservation);

export const reservationRoutes = router;
