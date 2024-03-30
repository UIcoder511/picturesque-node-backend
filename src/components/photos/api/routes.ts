import express from 'express';
import { PhotoController } from '.';
import { AuthController } from '@/components/users';

const router = express.Router();

router
  .route('/')
  .post(PhotoController.addNewPhoto)
  .get(AuthController.protect, PhotoController.getAllPhotos);

router.route('/:id').get(PhotoController.getPhotoById);

export default router;
