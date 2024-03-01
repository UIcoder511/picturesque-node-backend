import { PhotographerModel, PhotographerType } from '../domain';

export const getAllPhotographers = async (): Promise<
  PhotographerType[] | []
> => {
  try {
    return await PhotographerModel.find();
  } catch (error) {
    throw error;
  }
};

export const addNewPhotographer = async (photographerOb: PhotographerType) => {
  try {
    return await PhotographerModel.create(photographerOb);
  } catch (error) {
    throw error;
  }
};

export const getPhotographerById = async (
  id: String
): Promise<PhotographerType | null> => {
  try {
    return await PhotographerModel.findById(id);
  } catch (error) {
    throw error;
  }
};
