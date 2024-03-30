import mongoose, { ObjectId, Schema, Types } from 'mongoose';

export interface Photographer {
  name: string;
  id: number;
  profileLink: string;
  photos: Types.ObjectId[];
  createdAt: Date;
}

const schema = new Schema<Photographer>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  profileLink: String,
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'photos',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<Photographer>('photographers', schema);
