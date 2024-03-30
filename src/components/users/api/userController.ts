import { NextFunction, Request, Response } from 'express';
import { AuthService, UserService } from '../data-access';
import { UserType } from '../domain';
import { sendResponse } from '@/Helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/Helpers/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getTokenFormHeader, jwtVerifyPromisified } from '@/utils';
import catchAsync from '@/Helpers/catchAsync';

export const getUser = catchAsync(async (req: Request, res: Response) => {
  //get token
  const authToken = req.headers.authorization;

  const token = getTokenFormHeader(authToken);

  if (!token) throw new AppError('Unauthorized request', StatusCodes.UNAUTHORIZED);

  const decoded = (await jwtVerifyPromisified(
    token,
    process.env.JWT_SECRET as jwt.Secret
  )) as JwtPayload;

  const data = await UserService.getUser(decoded.id);
  //check user exists

  // console.log(data);
  sendResponse(res, StatusCodes.OK, data);
});
