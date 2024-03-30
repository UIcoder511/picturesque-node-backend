import express from 'express';
import { LikedPhotoController } from '.';

const router = express.Router();

router.route('/:userId').get(LikedPhotoController.getLikedPhotos);
router.route('/like').post(LikedPhotoController.likePhoto);
router.route('/unlike/:likePhotoId').post(LikedPhotoController.unlikePhoto);

export default router;
