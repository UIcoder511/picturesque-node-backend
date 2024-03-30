import { LikedPhotosUsersType } from '@/components/likedPhotos/data-access/service';
import { UserModel } from '../domain';

export const getUser = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user) throw new Error('User not found');

    const populatedUser = await user.populate<{ likedPhotos: LikedPhotosUsersType }>({
      path: 'likedPhotos',
      populate: {
        path: 'photoId',
        model: 'photos',
      },
    });
    return populatedUser;
  } catch (error) {
    throw error;
  }
};
