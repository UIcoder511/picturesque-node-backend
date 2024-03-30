import express from 'express';
import { PhotographerController } from './index';
import { AuthController } from '@/components/users';

const router = express.Router();

router
  .route('/')
  .post(AuthController.protect, PhotographerController.addNewPhotographer)
  .get(AuthController.protect, PhotographerController.getAllPhotographers);

router.route('/:id').get(PhotographerController.getPhotographerById);

export default router;
