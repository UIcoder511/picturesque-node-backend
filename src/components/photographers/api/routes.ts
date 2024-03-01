import express from 'express';
import { PhotographerController } from './index';

const router = express.Router();

router
  .route('/')
  .post(PhotographerController.addNewPhotographer)
  .get(PhotographerController.getAllPhotographers);

router.route('/:id').get(PhotographerController.getPhotographerById);

export default router;
