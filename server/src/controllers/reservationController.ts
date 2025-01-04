import { Request, Response } from 'express';
import { Reservation } from '../models/Reservation';
import mongoose from 'mongoose';
import { Error as MongooseError } from 'mongoose';
import { sendReservationConfirmation, sendAdminNotification } from '../services/emailService';
import { logger } from '../utils/logger';

export const createReservation = async (req: Request, res: Response) => {
  try {
    logger.info('Raw request body:', JSON.stringify(req.body, null, 2));

    // First validate all required fields including guests
    const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        const errorMsg = `Missing required field: ${field}`;
        logger.error(errorMsg);
        return res.status(400).json({
          success: false,
          message: errorMsg
        });
      }
    }

    // Parse and validate guests field with type coercion
    let guests;
    try {
      guests = req.body.guests !== undefined ? Number(req.body.guests) : 0;
      if (isNaN(guests)) guests = 0;
      if (guests < 0 || guests > 8) {
        throw new Error('Number of guests must be between 0 and 8');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Invalid guests value';
      logger.error(errorMsg);
      return res.status(400).json({
        success: false,
        message: errorMsg
      });
    }

    // Create the reservation with validated data
    const reservation = new Reservation({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: new Date(req.body.date),
      time: req.body.time,
      guests: guests,
    });

    logger.info('Processed reservation data:', JSON.stringify(reservation, null, 2));

    logger.info('Created reservation model, attempting to save');
    
    try {
      await reservation.save();
      logger.info('Reservation saved successfully:', reservation._id);
    } catch (err: unknown) {
      if (err instanceof mongoose.Error.ValidationError) {
        const validationError = err;
        logger.error('Mongoose validation error:', {
          error: validationError.message,
          errors: validationError.errors ? Object.entries(validationError.errors).map(([key, error]) => ({
            field: key,
            message: error.message,
            value: error.value
          })) : []
        });
        throw err;
      } else if (err instanceof mongoose.Error.CastError) {
        logger.error('Mongoose cast error:', {
          error: err.message,
          path: err.path,
          value: err.value
        });
        throw err;
      } else {
        logger.error('Unknown error saving reservation:', 
          err instanceof MongooseError ? err.message : 'Unknown error occurred');
        throw err;
      }
    }

    // Send confirmation emails
    try {
      await Promise.all([
        sendReservationConfirmation(reservation),
        sendAdminNotification(reservation)
      ]);
      logger.info('Confirmation emails sent successfully');
    } catch (emailError: unknown) {
      logger.error('Failed to send confirmation emails:', emailError);
      // Continue with the response even if emails fail
    }

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: reservation
    });
  } catch (err: unknown) {
    const error = err as MongooseError & {
      errors?: {
        [key: string]: {
          message: string;
          value: string | number | Date;
        };
      };
    };
    
    logger.error('Error creating reservation:', {
      message: error.message,
      name: error.name,
      errors: error instanceof MongooseError && 'errors' in error 
        ? Object.entries(error.errors || {}).map(([key, error]) => ({
            field: key,
            message: error?.message || 'Unknown error',
            value: error?.value
          }))
        : []
    });

    if (err instanceof mongoose.Error.ValidationError) {
      const validationError = err as mongoose.Error.ValidationError;
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(validationError.errors).map((err) => {
          if (err instanceof mongoose.Error.ValidatorError) {
            return err.message;
          } else if (err instanceof mongoose.Error.CastError) {
            return `Invalid value for ${err.path}`;
          }
          return 'An error occurred';
        })
      });
    } else if (err instanceof mongoose.Error.CastError) {
      const castError = err as mongoose.Error.CastError;
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${castError.path}`,
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to create reservation',
      error: error.message || 'Unknown error occurred'
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
  } catch (err: unknown) {
    logger.error('Error fetching reservations:', err);
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
  } catch (error: unknown) {
    logger.error('Error updating reservation:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      const validationError = error as mongoose.Error.ValidationError;
      logger.error('Mongoose validation error:', {
        error: validationError.message,
        errors: validationError.errors ? Object.entries(validationError.errors).map(([key, error]) => ({
          field: key,
          message: error.message,
          value: error.value
        })) : []
      });
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(validationError.errors).map((err) => {
          if (err instanceof mongoose.Error.ValidatorError) {
            return err.message;
          } else if (err instanceof mongoose.Error.CastError) {
            return `Invalid value for ${err.path}`;
          }
          return 'An error occurred';
        })
      });
    }
    
    if (error instanceof mongoose.Error.CastError) {
      const castError = error as mongoose.Error.CastError;
      return res.status(400).json({
        success: false,
        message: `Invalid value for ${castError.path}`,
      });
    }
    
    // Handle any other types of errors
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating the reservation',
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
  } catch (err: unknown) {
    logger.error('Error cancelling reservation:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel reservation',
      error: err instanceof MongooseError ? err.message : 'Unknown error occurred'
    });
  }
};
