import { Router } from 'express';
import { 
  createReservation, 
  getReservations, 
  updateReservation, 
  cancelReservation 
} from '../controllers/reservationController';

const router = Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.put('/:id', updateReservation);
router.patch('/:id/cancel', cancelReservation);

export const reservationRoutes = router;
