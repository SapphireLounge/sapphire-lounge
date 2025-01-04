import { Request, Response } from 'express';
import { EventRegistration } from '../models/EventRegistration';
import { logger } from '../utils/logger';

export const registerForEvent = async (req: Request, res: Response) => {
  try {
    const registration = new EventRegistration(req.body);
    await registration.save();

    res.status(201).json({
      success: true,
      message: 'Event registration successful',
      data: registration
    });
  } catch (error) {
    logger.error('Error registering for event:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register for event',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
