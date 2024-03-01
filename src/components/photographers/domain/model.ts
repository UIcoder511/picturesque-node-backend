import mongoose, { Schema } from 'mongoose';

export interface Photographer {
  name: String;
  id: Number;
  profileLink: String;
}

const schema = new Schema<Photographer>({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  profileLink: String,
});

export default mongoose.model<Photographer>('photographers', schema);
