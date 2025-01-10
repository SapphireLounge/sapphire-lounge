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
  guests: { 
    type: Number,
    default: 0,
    validate: {
      validator: function(v: number) {
        return Number.isInteger(v) && v >= 0 && v <= 8;
      },
      message: props => {
        if (!Number.isInteger(props.value)) return 'Number of guests must be a whole number';
        if (props.value < 0) return 'Number of guests cannot be negative';
        if (props.value > 8) return 'Maximum number of guests is 8';
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

export const ReservationModel = mongoose.model<IReservation>('Reservation', reservationSchema);
export { ReservationModel as Reservation };
