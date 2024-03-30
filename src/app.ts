import express, { Express, Request, Response, NextFunction, Router } from 'express';
import path from 'path';
import cors from 'cors';

import { StatusCodes } from 'http-status-codes';

import { PhotoRoutes } from './components/photos';
import { PhotographerRoutes } from './components/photographers';
import { UserRoutes } from './components/users';
import { LikedPhotoRoutes } from './components/likedPhotos';

import AppError from './Helpers/appError';
import errorController from './Helpers/ErrorController';

const app: Express = express();
app.use(cors());
app.use(express.json());
// console.log(path.join(__dirname, 'resources'));
app.use('/static', express.static(path.join(__dirname, '../resources')));

// Versioning using Router
const appV1Router: Router = Router();
app.use('/api/v1', appV1Router);

//Routes
appV1Router.use('/photos', PhotoRoutes);
appV1Router.use('/photographers', PhotographerRoutes);
appV1Router.use('/users', UserRoutes);
appV1Router.use('/likePhotos', LikedPhotoRoutes);

//Error page route
appV1Router.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, StatusCodes.BAD_REQUEST));
});

app.use(errorController);

export default app;
