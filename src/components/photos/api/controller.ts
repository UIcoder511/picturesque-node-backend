import { PhotoType } from '../domain';
import { Request, Response } from 'express';
import * as PhotoService from './../data-access';
import { sendResponse, statusCodes } from '@/Helpers/sendResponse';

export const addNewPhoto = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const photo: PhotoType = req.body;
    const data = await PhotoService.addNewPhoto(photo);
    sendResponse(res, statusCodes.OK, data);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, statusCodes.ERROR, null, error.message);
    }
  }
};

export const getAllPhotos = async (req: Request, res: Response) => {
  try {
    const data: PhotoType[] = await PhotoService.getAllPhotos();
    sendResponse(res, statusCodes.OK, data);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, statusCodes.ERROR, null, error.message);
    }
  }
};

export const getPhotoById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = await PhotoService.getPhotoById(id);
    sendResponse(res, statusCodes.OK, data);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, statusCodes.ERROR, null, error.message);
    }
  }
};
