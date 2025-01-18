import { Router } from 'express';
import { 
  createReservation,
  getReservations,
  updateReservation,
  cancelReservation
} from '../controllers/reservationController';

const router = Router();

router.post('/', createReservation as any);
router.get('/', getReservations as any);
router.put('/:id', updateReservation as any);
router.patch('/:id/cancel', cancelReservation as any);

export const reservationRoutes = router;
