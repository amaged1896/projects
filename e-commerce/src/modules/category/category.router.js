import express from 'express';
import * as categoryControllers from './category.controller.js';
import subCategoryRouter from '../subCategory/subCategory.router.js';
const categoryRouter = express.Router();

categoryRouter.use('/:categoryId/subcategories', subCategoryRouter);
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