import { Response } from 'express';

interface ResponseData {
  success: boolean;
  data?: any;
  error?: {
    message: String;
  };
  size?: Number;
}

export const statusCodes = {
  OK: 201,
  ERROR: 404,
};

export function sendResponse(
  res: Response,
  status: number,
  data?: any,
  error?: string
): void {
  const responseData: ResponseData = {
    success: status >= 200 && status < 400,
  };

  if (data) {
    responseData.data = data;
    if (Array.isArray(data)) responseData.size = data.length;
  } else if (error) {
    responseData.error = { message: error };
  }

  res.status(status).json(responseData);
}
