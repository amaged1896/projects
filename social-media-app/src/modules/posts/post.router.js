import express from 'express';
import * as postControllers from "./post.controller.js";
import { auth } from '../../middleware/auth.js';

const postRouter = express.Router();


postRouter.get('/', auth, postControllers.getPost);
postRouter.post('/addpost', auth, postControllers.addPost);
postRouter.delete('/delete', auth, postControllers.deletePost);

export default postRouter;