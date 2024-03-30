import { NextFunction, Request, Response } from 'express';
import AppError from './appError';
import { StatusCodes } from 'http-status-codes';

import { Error, Mongoose, MongooseError } from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const sendProdError = (err: AppError, res: Response) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  else {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};
const sendDevError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,

    stack: err.stack,
    error: err,
  });
};

const handleCastErrorDB = (error: AppError & Error.CastError): AppError => {
  const message = `Invalid ${error.path}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleJWTError = (error: AppError & JsonWebTokenError): AppError => {
  const message = `Invalid token! please login again!`;
  return new AppError(message, StatusCodes.UNAUTHORIZED);
};

const handleTokenExpiredError = (
  error: AppError & TokenExpiredError
): AppError => {
  const message = `Token has expired! please login again!`;
  return new AppError(message, StatusCodes.UNAUTHORIZED);
};

const handleValidationErrors = (
  error: AppError & Error.ValidationError
): AppError => {
  const errors = Object.values(error.errors).map(({ message }) => message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};
// const handleDuplicateFieldsError = (error: MongooseError): AppError => {
//   const message = `Duplicate field value ${error.err}. Please use another value`;
//   return new AppError(message, StatusCodes.BAD_REQUEST);
// };

export default (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else {
    let error: AppError & MongooseError = { ...err };

    if (err.name === 'CastError')
      error = handleCastErrorDB(error as AppError & Error.CastError);
    // if(err.code===11000)
    //     error=handleDuplicateFieldsError(error);
    if (err.name === 'ValidationError')
      error = handleValidationErrors(error as AppError & Error.ValidationError);
    if (err.name === 'JsonWebTokenError')
      error = handleJWTError(error as AppError & JsonWebTokenError);
    if (err.name === 'TokenExpiredError')
      error = handleTokenExpiredError(error as AppError & TokenExpiredError);

    sendProdError(error, res);
  }
};
