import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import { sendReservationConfirmation, sendAdminNotification } from '../services/emailService';
import { logger } from '../utils/logger';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    // Send confirmation emails
    await Promise.all([
      sendReservationConfirmation(reservation),
      sendAdminNotification(reservation)
    ]);

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation
    });
  } catch (error) {
    logger.error('Error creating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reservation'
    });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    const query = date ? { date: new Date(date as string) } : {};
    
    const reservations = await Reservation.find(query)
      .sort({ date: 1, time: 1 });

    res.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    logger.error('Error fetching reservations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reservations'
    });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.json({
      success: true,
      message: 'Reservation updated successfully',
      data: reservation
    });
  } catch (error) {
    logger.error('Error updating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update reservation'
    });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.json({
      success: true,
      message: 'Reservation cancelled successfully',
      data: reservation
    });
  } catch (error) {
    logger.error('Error cancelling reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel reservation'
    });
  }
};
