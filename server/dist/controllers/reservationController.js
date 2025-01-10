"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelReservation = exports.updateReservation = exports.getReservations = exports.createReservation = void 0;
const Reservation_1 = require("../models/Reservation");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const emailService_1 = require("../services/emailService");
const logger_1 = require("../utils/logger");
const createReservation = async (req, res) => {
    try {
        logger_1.logger.info('Raw request body:', JSON.stringify(req.body, null, 2));
        // First validate all required fields including guests
        const requiredFields = ['name', 'email', 'phone', 'date', 'time'];
        for (const field of requiredFields) {
            if (!req.body[field]) {
                const errorMsg = `Missing required field: ${field}`;
                logger_1.logger.error(errorMsg);
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
            if (isNaN(guests))
                guests = 0;
            if (guests < 0 || guests > 8) {
                throw new Error('Number of guests must be between 0 and 8');
            }
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Invalid guests value';
            logger_1.logger.error(errorMsg);
            return res.status(400).json({
                success: false,
                message: errorMsg
            });
        }
        // Create the reservation with validated data
        const reservation = new Reservation_1.Reservation({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            date: new Date(req.body.date),
            time: req.body.time,
            guests: guests,
        });
        logger_1.logger.info('Processed reservation data:', JSON.stringify(reservation, null, 2));
        logger_1.logger.info('Created reservation model, attempting to save');
        try {
            await reservation.save();
            logger_1.logger.info('Reservation saved successfully:', reservation._id);
        }
        catch (err) {
            if (err instanceof mongoose_1.default.Error.ValidationError) {
                const validationError = err;
                logger_1.logger.error('Mongoose validation error:', {
                    error: validationError.message,
                    errors: validationError.errors ? Object.entries(validationError.errors).map(([key, error]) => ({
                        field: key,
                        message: error.message,
                        value: error.value
                    })) : []
                });
                throw err;
            }
            else if (err instanceof mongoose_1.default.Error.CastError) {
                logger_1.logger.error('Mongoose cast error:', {
                    error: err.message,
                    path: err.path,
                    value: err.value
                });
                throw err;
            }
            else {
                logger_1.logger.error('Unknown error saving reservation:', err instanceof mongoose_2.Error ? err.message : 'Unknown error occurred');
                throw err;
            }
        }
        // Send confirmation emails
        try {
            await Promise.all([
                (0, emailService_1.sendReservationConfirmation)(reservation),
                (0, emailService_1.sendAdminNotification)(reservation)
            ]);
            logger_1.logger.info('Confirmation emails sent successfully');
        }
        catch (emailError) {
            logger_1.logger.error('Failed to send confirmation emails:', emailError);
            // Continue with the response even if emails fail
        }
        res.status(201).json({
            success: true,
            message: 'Reservation created successfully',
            data: reservation
        });
    }
    catch (err) {
        const error = err;
        logger_1.logger.error('Error creating reservation:', {
            message: error.message,
            name: error.name,
            errors: error instanceof mongoose_2.Error && 'errors' in error
                ? Object.entries(error.errors || {}).map(([key, error]) => ({
                    field: key,
                    message: error?.message || 'Unknown error',
                    value: error?.value
                }))
                : []
        });
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            const validationError = err;
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: Object.values(validationError.errors).map((err) => {
                    if (err instanceof mongoose_1.default.Error.ValidatorError) {
                        return err.message;
                    }
                    else if (err instanceof mongoose_1.default.Error.CastError) {
                        return `Invalid value for ${err.path}`;
                    }
                    return 'An error occurred';
                })
            });
        }
        else if (err instanceof mongoose_1.default.Error.CastError) {
            const castError = err;
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
exports.createReservation = createReservation;
const getReservations = async (req, res) => {
    try {
        const { date } = req.query;
        const query = date ? { date: new Date(date) } : {};
        const reservations = await Reservation_1.Reservation.find(query)
            .sort({ date: 1, time: 1 });
        res.json({
            success: true,
            data: reservations
        });
    }
    catch (err) {
        logger_1.logger.error('Error fetching reservations:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reservations'
        });
    }
};
exports.getReservations = getReservations;
const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation_1.Reservation.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true });
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
    }
    catch (error) {
        logger_1.logger.error('Error updating reservation:', error);
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const validationError = error;
            logger_1.logger.error('Mongoose validation error:', {
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
                    if (err instanceof mongoose_1.default.Error.ValidatorError) {
                        return err.message;
                    }
                    else if (err instanceof mongoose_1.default.Error.CastError) {
                        return `Invalid value for ${err.path}`;
                    }
                    return 'An error occurred';
                })
            });
        }
        if (error instanceof mongoose_1.default.Error.CastError) {
            const castError = error;
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
exports.updateReservation = updateReservation;
const cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation_1.Reservation.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
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
    }
    catch (err) {
        logger_1.logger.error('Error cancelling reservation:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to cancel reservation',
            error: err instanceof mongoose_2.Error ? err.message : 'Unknown error occurred'
        });
    }
};
exports.cancelReservation = cancelReservation;
