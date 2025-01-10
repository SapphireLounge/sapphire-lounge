import { Request, Response } from 'express';
import { Newsletter } from '../models/Newsletter';
import { logger } from '../utils/logger';

export const subscribeToNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        message: 'This email is already subscribed to our newsletter.'
      });
    }

    // Create new subscriber
    const subscriber = new Newsletter({ email });
    await subscriber.save();

    // TODO: Enable email confirmation after business acquisition
    // 1. Set up business email account
    // 2. Configure email service in .env
    // 3. Uncomment the following line:
    // await sendNewsletterConfirmation(email);

    logger.info(`New newsletter subscription: ${email}`);

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
  } catch (error) {
    logger.error('Error in newsletter subscription:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again.'
    });
  }
};
