import catchAsync from '@/Helpers/catchAsync';
import { PhotoType } from '@/components/photos';
import { Request, Response } from 'express';
import { LikedPhotoSerivce } from '../data-access';
import { Types } from 'mongoose';
import { sendResponse } from '@/Helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';

export const getLikedPhotos = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const data = await LikedPhotoSerivce.getLikedPhotos(userId);
  sendResponse(res, StatusCodes.OK, data);
});

export const likePhoto = catchAsync(async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const photoId = req.body.photoId;
  const data = await LikedPhotoSerivce.likePhoto(userId, photoId);
  sendResponse(res, StatusCodes.OK, data);
});

export const unlikePhoto = catchAsync(async (req: Request, res: Response) => {
  const likePhotoId = req.params.likePhotoId;
  await LikedPhotoSerivce.unlikePhoto(likePhotoId);
  sendResponse(res, StatusCodes.OK, 'Photo unliked successfully');
});
