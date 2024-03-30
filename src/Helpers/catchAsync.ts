import { NextFunction, Request, Response } from 'express';

type fnType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<undefined> | Promise<void>;

export default (fn: fnType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
