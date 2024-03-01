import { Request, Response } from 'express';

import * as PhotographerService from '../data-access';
import { PhotographerType } from '../domain';
import { sendResponse, statusCodes } from '@/Helpers/sendResponse';

export const getAllPhotographers = async (req: Request, res: Response) => {
  try {
    const data: PhotographerType[] =
      await PhotographerService.getAllPhotographers();
    sendResponse(res, statusCodes.OK, data);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, statusCodes.ERROR, null, error.message);
    }
  }
};

export const addNewPhotographer = async (req: Request, res: Response) => {
  try {
    const photographer: PhotographerType = req.body;
    const data = await PhotographerService.addNewPhotographer(photographer);
    sendResponse(res, statusCodes.OK, data);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, statusCodes.ERROR, null, error.message);
    }
  }
};

export const getPhotographerById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const data = await PhotographerService.getPhotographerById(id);
    sendResponse(res, statusCodes.OK, data);
  } catch (error) {
    if (error instanceof Error) {
      sendResponse(res, statusCodes.ERROR, null, error.message);
    }
  }
};
