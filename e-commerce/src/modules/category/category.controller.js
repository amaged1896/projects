import { categoryModel } from './../../../databases/models/category.model.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from '../handlers/factory.js';

const createCategory = createOne(categoryModel);

const getAllCategories = getAll(categoryModel);

const getCategory = getOne(categoryModel);

const updateCategory = updateOne(categoryModel);

const deleteCategory = deleteOne(categoryModel);

export {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};