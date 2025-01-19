"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelReservation = exports.updateReservation = exports.getReservations = void 0;
exports.createReservation = createReservation;
const qrcode_1 = __importDefault(require("qrcode"));
async function generateQRCode(reservation) {
    // Create a unique reservation code
    const reservationCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // Create reservation data
    const reservationData = {
        code: reservationCode,
        date: reservation.date.toISOString(),
        time: reservation.time,
        name: reservation.name,
        phone: reservation.phone,
        guests: reservation.guests,
        tablePreference: reservation.tablePreference,
        occasion: reservation.occasion,
        specialRequests: reservation.specialRequests,
        timestamp: new Date().toISOString()
    };
    // Generate QR code
    const qrCodeDataURL = await qrcode_1.default.toDataURL(JSON.stringify(reservationData));
    return qrCodeDataURL;
}
async function createReservation(req, res) {
    try {
        const { date, time, name, phone, guests, tablePreference, occasion, specialRequests } = req.body;
        // Log received data for debugging
        console.log('Received reservation data:', {
            date,
            time,
            name,
            phone,
            guests,
            tablePreference,
            occasion,
            specialRequests
        });
        // Validate required fields
        if (!date || !time || !name || !phone || !guests) {
            console.log('Missing required fields');
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['date', 'time', 'name', 'phone', 'guests'],
                received: {
                    date: !!date,
                    time: !!time,
                    name: !!name,
                    phone: !!phone,
                    guests: !!guests
                }
            });
        }
        // Log the date before parsing
        console.log('Date received:', date);
        // Validate date
        const reservationDate = new Date(date);
        if (isNaN(reservationDate.getTime())) {
            console.log('Invalid date');
            return res.status(400).json({
                error: 'Invalid date format',
                received: date
            });
        }
        // Create the reservation with the proper Date object
        const reservation = {
            name,
            phone,
            date: reservationDate,
            time,
            guests,
            tablePreference,
            occasion,
            specialRequests,
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        try {
            const qrCodeDataURL = await generateQRCode(reservation);
            // Return success response with QR code
            return res.status(200).json({
                success: true,
                message: 'Reservation created successfully',
                data: {
                    reservation: {
                        date: reservation.date.toISOString(),
                        time: reservation.time,
                        name: reservation.name,
                        phone: reservation.phone,
                        guests: reservation.guests,
                        tablePreference: reservation.tablePreference,
                        occasion: reservation.occasion ?? '',
                        specialRequests: reservation.specialRequests ?? '',
                        qrCode: qrCodeDataURL
                    }
                }
            });
        }
        catch (error) {
            console.error('Error creating reservation:', error);
            return res.status(500).json({
                success: false,
                error: 'Failed to create reservation',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    catch (error) {
        console.error('Reservation error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        console.error('Error details:', error);
        return res.status(500).json({
            error: 'Failed to process reservation',
            details: {
                message: error.message,
                type: error.name
            }
        });
    }
}
;
const getReservations = async (req, res) => {
    try {
        // TODO: Implement fetching reservations from database
        res.status(200).json({ message: 'Get reservations endpoint' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};
exports.getReservations = getReservations;
const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: Implement updating reservation in database
        res.status(200).json({ message: `Update reservation ${id} endpoint` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update reservation' });
    }
};
exports.updateReservation = updateReservation;
const cancelReservation = async (req, res) => {
    try {
        const { id } = req.params;
        // TODO: Implement canceling reservation in database
        res.status(200).json({ message: `Cancel reservation ${id} endpoint` });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to cancel reservation' });
    }
};
exports.cancelReservation = cancelReservation;
const reservationController = {
    createReservation,
    getReservations: exports.getReservations,
    updateReservation: exports.updateReservation,
    cancelReservation: exports.cancelReservation
};
exports.default = reservationController;
