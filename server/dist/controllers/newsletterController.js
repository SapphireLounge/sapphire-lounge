"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToNewsletter = void 0;
const Newsletter_1 = require("../models/Newsletter");
const logger_1 = require("../utils/logger");
const subscribeToNewsletter = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if email already exists
        const existingSubscriber = await Newsletter_1.Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                success: false,
                message: 'This email is already subscribed to our newsletter.'
            });
        }
        // Create new subscriber
        const subscriber = new Newsletter_1.Newsletter({ email });
        await subscriber.save();
        // TODO: Enable email confirmation after business acquisition
        // 1. Set up business email account
        // 2. Configure email service in .env
        // 3. Uncomment the following line:
        // await sendNewsletterConfirmation(email);
        logger_1.logger.info(`New newsletter subscription: ${email}`);
        res.status(201).json({
            success: true,
            message: 'Successfully subscribed to newsletter!'
        });
    }
    catch (error) {
        logger_1.logger.error('Error in newsletter subscription:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to subscribe to newsletter. Please try again.'
        });
    }
};
exports.subscribeToNewsletter = subscribeToNewsletter;
