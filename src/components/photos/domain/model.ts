import mongoose, { Schema } from 'mongoose';

export interface Photo {
  id: number;
  url: string;
  photographerId: number;
  photographerName: string;
  photographerProfile: string;
  title: string;
  avgColor: string;
  size: {
    or: string;
    md: string;
    lg: string;
    tn: string;
  };
  createdAt: Date;
  noOfLikes?: number;
  noOfSaves?: number;
}

const schema = new Schema<Photo>({
  id: {
    type: Number,
    unique: true,
  },
  photographerId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    trim: true,
  },
  photographerProfile: {
    type: String,
    trim: true,
  },
  photographerName: {
    type: String,
    trim: true,
  },
  avgColor: {
    type: String,
  },
  size: {
    md: String,
    lg: String,
    or: String,
    tn: String,
  },
  noOfLikes: {
    type: Number,
    default: 0,
  },
  noOfSaves: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<Photo>('photos', schema, 'photos');
