import express from 'express';
import * as categoryControllers from './category.controller.js';
const categoryRouter = express.Router();


categoryRouter
    .route('/')
    .post(categoryControllers.createCategory)
    .get(categoryControllers.getAllCategories);

categoryRouter
    .route('/:id')
    .get(categoryControllers.getCategory)
    .delete(categoryControllers.deleteCategory)
    .put(categoryControllers.updateCategory);

export default categoryRouter;