"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerForEvent = void 0;
const EventRegistration_1 = require("../models/EventRegistration");
const logger_1 = require("../utils/logger");
const registerForEvent = async (req, res) => {
    try {
        const registration = new EventRegistration_1.EventRegistration(req.body);
        await registration.save();
        res.status(201).json({
            success: true,
            message: 'Event registration successful',
            data: registration
        });
    }
    catch (error) {
        logger_1.logger.error('Error registering for event:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to register for event',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.registerForEvent = registerForEvent;
