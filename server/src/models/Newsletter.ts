import mongoose from 'mongoose';

export interface INewsletter {
  email: string;
  subscribed: boolean;
  subscribedAt: Date;
  updatedAt: Date;
}

const newsletterSchema = new mongoose.Schema<INewsletter>({
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

export const Newsletter = mongoose.model<INewsletter>('Newsletter', newsletterSchema);
