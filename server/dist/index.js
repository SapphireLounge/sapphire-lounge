"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const reservations_1 = require("./routes/reservations");
const newsletterRoutes_1 = __importDefault(require("./routes/newsletterRoutes"));
const events_1 = require("./routes/events");
const errorHandler_1 = require("./middleware/errorHandler");
const cors_1 = require("./middleware/cors");
const logger_1 = require("./utils/logger");
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(cors_1.corsMiddleware);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Routes
app.use('/api/reservations', reservations_1.reservationRoutes);
app.use('/api/newsletter', newsletterRoutes_1.default);
app.use('/api/events', events_1.eventRoutes);
// Error handling
app.use(errorHandler_1.errorHandler);
// Connect to MongoDB
(0, database_1.default)().catch((error) => {
    logger_1.logger.error('Failed to connect to MongoDB:', error);
});
// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000; // Changed to port 5000 to match client expectations
    app.listen(PORT, () => {
        logger_1.logger.info(`Server running on port ${PORT}`);
    });
}
// Export for Vercel
exports.default = app;
