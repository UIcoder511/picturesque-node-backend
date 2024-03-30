import { PhotographerModel } from '@/components/photographers';
import { PhotoModel, PhotoType } from '../domain';
import { ObjectId, Schema, Types } from 'mongoose';

export const addNewPhoto = async (photoOb: PhotoType) => {
  console.log(photoOb);
  try {
    const photob = await PhotoModel.create(photoOb);

    let photographer = await PhotographerModel.findOne({ id: photob.photographerId });

    if (!photographer) {
      photographer = await PhotographerModel.create({
        name: photob.photographerName,
        id: photob.photographerId,
        profileLink: photob.photographerProfile,
        photos: [photob._id], // Add the newly created photo's object id in the photos array
      });
    } else {
      if (!photographer.photos.includes(photob._id as Types.ObjectId)) {
        // If photographer already exists, push the object id in the array
        photographer.photos.push(photob._id as Types.ObjectId);
        await photographer.save();
      }
    }

    return photob;
  } catch (error) {
    throw error;
  }
};

export const getAllPhotos = async (): Promise<PhotoType[] | []> => {
  console.log('getAllPhotos');
  try {
    return await PhotoModel.find();
  } catch (error) {
    throw error;
  }
};

export const getPhotoById = async (id: String): Promise<PhotoType | null> => {
  try {
    return await PhotoModel.findById(id);
  } catch (error) {
    throw error;
  }
};
