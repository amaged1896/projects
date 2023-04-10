import express from 'express';
import * as categoryControllers from './category.controller.js';
import subCategoryRouter from '../subCategory/subCategory.router.js';
import { validation } from '../../middleware/validation.js';
import { categorySchema, updateCategory, getCategory } from './category.validation.js';
import { uploadSingleFile } from '../../middleware/fileUpload.js';
const categoryRouter = express.Router();

categoryRouter.use('/:categoryId/subcategories', subCategoryRouter);
categoryRouter
    .route('/')
    .post(uploadSingleFile('image', 'category'), validation(categorySchema), categoryControllers.createCategory)
    .get(categoryControllers.getAllCategories);

categoryRouter
    .route('/:id')
    .get(validation(getCategory), categoryControllers.getCategory)
    .delete(validation(getCategory), categoryControllers.deleteCategory)
    .put(validation(updateCategory), categoryControllers.updateCategory);

export default categoryRouter;