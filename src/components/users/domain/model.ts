import mongoose, { Model as ModelType, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
// type EmailType=

export interface User {
  name: string;
  email: string;
  // photo: string;
  password: string;
  passwordConfirm: string | undefined;
  passwordChangedAt: Date;
  likedPhotos: Types.ObjectId[];
  savedPhotos: Types.ObjectId[];
}

interface UserMethods {
  correctPassword(typedPassword: string, password: string): Promise<boolean>;
  IsChangedPasswordAfter(jwtTimeStamp: number): boolean;
  likePhoto(photoId: Types.ObjectId): Promise<User>;
  UnlikePhoto(photoId: Types.ObjectId): Promise<User>;
}

type UserModel = ModelType<User, {}, UserMethods>;

const schema = new mongoose.Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: [true, 'Name is a required field'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is a required field'],
    lowercase: true,
    validate: [validator.isEmail, 'Email is not valid'],
  },
  // photo: String,
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    // validate: {
    //   // validator:function(value:String){
    //   //     return this.password
    //   // }
    // },
  },
  passwordChangedAt: Date,
  likedPhotos: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'likedPhotos',
      },
    ],
    default: [],
  },
  savedPhotos: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'photos',
      },
    ],
    default: [],
  },
});

schema.method('correctPassword', async function (typedPassword: string, password: string) {
  console.log(typedPassword, password);
  return await bcrypt.compare(typedPassword, password);
});

schema.method('IsChangedPasswordAfter', async function (jwtTimeStamp: number) {
  if (this.passwordChangedAt) {
    // jwtTimeStamp -> seconds
    const passwordChangedAtMils = Math.round(this.passwordChangedAt.getTime() / 1000);
    return passwordChangedAtMils > jwtTimeStamp;
  }
  return false;
});

schema.method('likePhoto', async function (photoId: Types.ObjectId) {
  this.likedPhotos.push(photoId);

  return this.save();
});

schema.method('UnlikePhoto', async function (photoId: Types.ObjectId) {
  this.likedPhotos = this.likedPhotos.filter((photo) => photo !== photoId);

  return this.save();
});

schema.path('passwordConfirm').validate(function (value: String) {
  return this.password === value;
}, 'Passowrd should match');

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const Model = mongoose.model<User, UserModel>('users', schema);

export default Model;
