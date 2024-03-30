import { NextFunction, Request, Response } from 'express';

import * as PhotographerService from '../data-access';
import { PhotographerType } from '../domain';
import { sendResponse } from '@/Helpers/sendResponse';
import catchAsync from '@/Helpers/catchAsync';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/Helpers/appError';

export const getAllPhotographers = catchAsync(
  async (req: Request, res: Response) => {
    const data: PhotographerType[] =
      await PhotographerService.getAllPhotographers();
    sendResponse(res, StatusCodes.OK, data);
  }
);

export const addNewPhotographer = catchAsync(
  async (req: Request, res: Response) => {
    const photographer: PhotographerType = req.body;
    const data = await PhotographerService.addNewPhotographer(photographer);
    sendResponse(res, StatusCodes.OK, data);
  }
);

export const getPhotographerById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    // console.log(id);
    const data = await PhotographerService.getPhotographerById(id);
    if (!data) {
      next(
        new AppError(
          'No Photographer Found with provided ID',
          StatusCodes.NOT_FOUND
        )
      );
    }
    sendResponse(res, StatusCodes.OK, data);
  }
);
