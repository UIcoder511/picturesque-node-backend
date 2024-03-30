import mongoose, { Schema, Types } from 'mongoose';

export interface LikedPhoto {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  photoId: Types.ObjectId;
}

const LikedPhotoModel = new mongoose.Schema<LikedPhoto>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  photoId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'photos',
  },
});

export default mongoose.model<LikedPhoto>('likedPhotos', LikedPhotoModel);
