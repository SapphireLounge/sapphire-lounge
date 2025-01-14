import mongoose from 'mongoose';

export interface IEventRegistration {
  eventId?: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  notes?: string;
  qrCode?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const eventRegistrationSchema = new mongoose.Schema<IEventRegistration>({
  eventId: { 
    type: String,
    default: () => `EVT-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  },
  eventTitle: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 10 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  qrCode: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true
});

export const EventRegistration = mongoose.model<IEventRegistration>('EventRegistration', eventRegistrationSchema);
