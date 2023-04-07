import { subCategoryModel } from './../../../databases/models/subCategory.model.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from "../handlers/factory.js";

const createSubCategory = createOne(subCategoryModel);

const getAllSubCategories = getAll(subCategoryModel);

const getSubCategory = getOne(subCategoryModel);

const updateSubCategory = updateOne(subCategoryModel);

const deleteSubCategory = deleteOne(subCategoryModel);

export {
    createSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
};