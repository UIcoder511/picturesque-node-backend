import mongoose, { Schema } from 'mongoose';

export interface Photo {
  id: String;
  photographerId: Number;
  title: String;
  avgColor: String;
  size: {
    or: String;
    md: String;
    lg: String;
  };
}

const schema = new Schema<Photo>({
  id: {
    type: Number,
    unique: true,
  },
  photographerId: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
  },
  avgColor: {
    type: String,
  },
  size: {
    md: String,
    lg: String,
    or: String,
  },
});

export default mongoose.model<Photo>('photos', schema, 'photos');
