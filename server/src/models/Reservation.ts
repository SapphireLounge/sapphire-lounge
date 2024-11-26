import mongoose from 'mongoose';

export interface IReservation {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  tablePreference?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new mongoose.Schema<IReservation>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 6 },
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

export const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);
