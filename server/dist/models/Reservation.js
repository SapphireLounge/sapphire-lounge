"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reservation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reservationSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: {
        type: Number,
        default: 0,
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 0 && v <= 8;
            },
            message: props => {
                if (!Number.isInteger(props.value))
                    return 'Number of guests must be a whole number';
                if (props.value < 0)
                    return 'Number of guests cannot be negative';
                if (props.value > 8)
                    return 'For parties larger than 8, please contact us directly';
                return 'Invalid number of guests';
            }
        }
    },
    tablePreference: { type: String },
    notes: { type: String },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});
// Index for querying reservations by date
reservationSchema.index({ date: 1, time: 1 });
exports.Reservation = mongoose_1.default.model('Reservation', reservationSchema);
