import express from 'express';
import { PhotoController } from './index';

const router = express.Router();

router
  .route('/')
  .post(PhotoController.addNewPhoto)
  .get(PhotoController.getAllPhotos);

router.route('/:id').get(PhotoController.getPhotoById);

export default router;
