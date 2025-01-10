import mongoose from 'mongoose';

export interface IEventRegistration {
  eventId: number;
  name: string;
  email: string;
  phone: string;
  guests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const eventRegistrationSchema = new mongoose.Schema<IEventRegistration>({
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

export const EventRegistration = mongoose.model<IEventRegistration>('EventRegistration', eventRegistrationSchema);
