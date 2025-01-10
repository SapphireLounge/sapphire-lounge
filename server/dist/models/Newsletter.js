"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Newsletter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const newsletterSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    subscribed: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: {
        createdAt: 'subscribedAt',
        updatedAt: true
    }
});
exports.Newsletter = mongoose_1.default.model('Newsletter', newsletterSchema);
