import slugify from "slugify";
import { AppError } from "../../utlis/AppError.js";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { subCategoryModel } from './../../../databases/models/subCategory.model.js';
const createSubCategory = catchAsyncError(async (req, res, next) => {
    const { name, category } = req.body;
    let result = new subCategoryModel({ name, category, slug: slugify(name) });
    await result.save();
    res.status(201).json({ message: "success", data: result });
});

const getAllSubCategories = catchAsyncError(async (req, res, next) => {
    let result = await subCategoryModel.find();
    res.status(201).json({ message: "success", data: result });
});

const getSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await subCategoryModel.findById(id);
    !result && next(new AppError(`subcategory not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

const updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    let result = await subCategoryModel.findByIdAndUpdate(id, { name, category, slug: slugify(name) }, { new: true });
    !result && next(new AppError(`subcategory not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

const deleteSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await subCategoryModel.findByIdAndDelete(id);
    !result && next(new AppError(`subcategory not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

export {
    createSubCategory,
    getAllSubCategories,
    getSubCategory,
    updateSubCategory,
    deleteSubCategory
};