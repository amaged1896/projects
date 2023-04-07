import express from 'express';
import * as subCategory from './subCategory.controller.js';
const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
    .route('/')
    .post(subCategory.createSubCategory)
    .get(subCategory.getAllSubCategories);

subCategoryRouter
    .route('/:id')
    .get(subCategory.getSubCategory)
    .delete(subCategory.deleteSubCategory)
    .put(subCategory.updateSubCategory);

export default subCategoryRouter;