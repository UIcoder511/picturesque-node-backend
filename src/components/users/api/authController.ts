import { NextFunction, Request, Response } from 'express';
import { AuthService, UserService } from '../data-access';
import { UserType } from '../domain';
import { sendResponse } from '@/Helpers/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '@/Helpers/appError';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { getTokenFormHeader, jwtVerifyPromisified } from '@/utils';
import catchAsync from '@/Helpers/catchAsync';
import { UserModel } from '../';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser: UserType = req.body;
  const data = await AuthService.signup(newUser);
  console.log(data);
  sendResponse(res, StatusCodes.OK, data);
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const data = await AuthService.login(email, password);
  sendResponse(res, StatusCodes.OK, data);
});

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  //get token
  const authToken = req.headers.authorization;

  const token = getTokenFormHeader(authToken);

  if (!token) return next(new AppError('Unauthorized request', StatusCodes.UNAUTHORIZED));

  //verify token
  const decoded = (await jwtVerifyPromisified(
    token,
    process.env.JWT_SECRET as jwt.Secret
  )) as JwtPayload;
  console.log(decoded);
  //check user exists
  const user = await UserService.getUser(decoded.id);
  console.log(user);
  if (!user) {
    return next(
      new AppError('The User belonging to the token does not exists', StatusCodes.UNAUTHORIZED)
    );
  }

  //check is user changed password after JWT issued
  if (!user.IsChangedPasswordAfter(decoded.iat as number))
    return next(
      new AppError('User recently changed password! please login again', StatusCodes.UNAUTHORIZED)
    );

  // req.user=user;
  next();
});
