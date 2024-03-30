import express from 'express';
import { AuthController, UserController } from '.';

const router = express.Router();

router.route('/signup').post(AuthController.signup);
router.route('/login').post(AuthController.login);
router.route('/get-user').get(UserController.getUser);

export default router;
