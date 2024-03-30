import { PhotoType } from '../domain';
import { NextFunction, Request, Response } from 'express';
import * as PhotoService from './../data-access';
import { sendResponse } from '@/Helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/Helpers/appError';

export const addNewPhoto = async (req: Request, res: Response) => {
  console.log(req.body);
  const photo: PhotoType = req.body;
  const data = await PhotoService.addNewPhoto(photo);
  sendResponse(res, StatusCodes.OK, data);
};

export const getAllPhotos = async (req: Request, res: Response) => {
  const data: PhotoType[] = await PhotoService.getAllPhotos();
  console.log(data);
  sendResponse(res, StatusCodes.OK, data);
};

export const getPhotoById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const data = await PhotoService.getPhotoById(id);
  if (!data) {
    next(new AppError('No Photo Found with provided ID', StatusCodes.NOT_FOUND));
  }
  sendResponse(res, StatusCodes.OK, data);
};
