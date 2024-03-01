import { PhotoModel, PhotoType } from '../domain';

export const addNewPhoto = async (photoOb: PhotoType) => {
  console.log(photoOb);
  try {
    return await PhotoModel.create(photoOb);
  } catch (error) {
    throw error;
  }
};

export const getAllPhotos = async (): Promise<PhotoType[] | []> => {
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
