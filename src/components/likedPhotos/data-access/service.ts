import { PhotoModel, PhotoType } from '@/components/photos';
import { UserModel } from '@/components/users';
import { LikedPhotoModel } from '../domain';
import { Types } from 'mongoose';

export interface LikedPhotosUsersType {
  userId: string;
  photoId: PhotoType;
}
[];

export const getLikedPhotos = async (userId: string): Promise<LikedPhotosUsersType> => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  //   const photosLikeObs = (await user.populate<{ likedPhotos: PhotoType[] }>('likedPhotos')).likedPhotos;
  const photos = (
    await user.populate<{ likedPhotos: LikedPhotosUsersType }>({
      path: 'likedPhotos',
      populate: {
        path: 'photoId',
        model: 'photos',
      },
    })
  ).likedPhotos;

  return photos;
};

export const likePhoto = async (userId: string, photoId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  const photo = await PhotoModel.findById(photoId);
  if (!photo) throw new Error('Photo not found');

  const newLikeOb = await LikedPhotoModel.create({ userId: userId, photoId: photoId });

  await UserModel.findByIdAndUpdate(userId, { $push: { likedPhotos: newLikeOb._id } });

  await PhotoModel.findByIdAndUpdate(photoId, { $inc: { noOfLikes: 1 } });

  return newLikeOb;
};

export const unlikePhoto = async (likePhotoId: string) => {
  const likedPhoto = await LikedPhotoModel.findById(likePhotoId);
  if (!likedPhoto) throw new Error('Liked photo not found');

  await UserModel.findByIdAndUpdate(likedPhoto.userId, { $pull: { likedPhotos: likePhotoId } });

  await PhotoModel.findByIdAndUpdate(likedPhoto.photoId, { $inc: { noOfLikes: -1 } });

  await LikedPhotoModel.findByIdAndDelete(likePhotoId);
};
