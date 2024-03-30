import { Types } from 'mongoose';
import { UserModel, UserType } from '../domain';
import jwt from 'jsonwebtoken';
import { LikedPhotosUsersType } from '@/components/likedPhotos/data-access/service';

// type UserWithId = UserType & { _id: Schema.Types.ObjectId };

function generateToken(userId: Types.ObjectId): string {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Example expiration time
  });
  return token;
}

export const signup = async (newUser: UserType) => {
  const user: UserType = {
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    // photo: newUser.photo,
    passwordConfirm: newUser.passwordConfirm,
    passwordChangedAt: new Date(),
    likedPhotos: [],
    savedPhotos: [],
  };

  try {
    let createdUser = await UserModel.create(user);
    // const token = jwt.sign(
    //   { id: createdUser._id },
    //   process.env.JWT_SECRET as string,
    //   {
    //     expiresIn: process.env.JWT_EXPIRES_IN, // Example expiration time
    //   }
    // );
    const token = generateToken(createdUser._id);
    return { token, user: createdUser, message: 'User created successfully' };
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw Error('Email and Password are required');
    }

    let user = await UserModel.findOne({ email }).select('+password');
    // const password = user;
    if (user) {
      const isPasswordCorrect = await user.correctPassword(password, user.password);
      if (isPasswordCorrect) {
        const token = generateToken(user._id);
        // delete user.password;

        const populatedUser = await user.populate<{ likedPhotos: LikedPhotosUsersType }>({
          path: 'likedPhotos',
          populate: {
            path: 'photoId',
            model: 'photos',
          },
        });

        return { user: populatedUser, token };
      }
    }

    // const token = generateToken(createdUser as UserWithId);
    throw Error('Email or Password is wrong!');
  } catch (error) {
    throw error;
  }
};
