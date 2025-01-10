"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRegistration = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventRegistrationSchema = new mongoose_1.default.Schema({
    eventId: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true, min: 1, max: 10 },
    notes: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});
exports.EventRegistration = mongoose_1.default.model('EventRegistration', eventRegistrationSchema);
