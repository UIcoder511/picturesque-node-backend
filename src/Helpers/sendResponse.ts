import { Response } from 'express';

enum StatusType {
  Success = 'success',
  Error = 'error',
}
interface ResponseData {
  status: StatusType;
  data?: any;

  message?: String;
  stack?: String;
  error?: any;
  size?: Number;
}

export function sendResponse(res: Response, status: number, data?: any, error?: string): void {
  const responseData: ResponseData = {
    status: status >= 200 && status < 400 ? StatusType.Success : StatusType.Error,
  };

  if (data) {
    responseData.data = data;
    if (Array.isArray(data)) responseData.size = data.length;
  }

  if (data.message && typeof data.message === 'string') {
    responseData.message = data.message;
  }

  res.status(status).json(responseData);
}
