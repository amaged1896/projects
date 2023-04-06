import express from 'express';
import * as userControllers from './user.controller.js';

const userRouter = express.Router();

userRouter.post('/signup', userControllers.signup);
userRouter.post('/signin', userControllers.signin);

export default userRouter;