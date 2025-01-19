"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        console.log('Attempting to connect to MongoDB...');
        await mongoose_1.default.connect(mongoUri);
        console.log('MongoDB Connected Successfully');
        logger_1.logger.info('MongoDB Connected Successfully');
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        logger_1.logger.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};
exports.default = connectDB;
