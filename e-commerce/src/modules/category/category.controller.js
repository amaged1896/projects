import { categoryModel } from './../../../databases/models/category.model.js';
import slugify from "slugify";
import { catchAsyncError } from "../../middleware/catchAsyncError.js";

const createCategory = catchAsyncError(async (req, res, next) => {
    const { name } = req.body;
    let result = new categoryModel({ name, slug: slugify(name) });
    await result.save();
    res.status(201).json({ message: "success", data: result });
});

const getAllCategories = catchAsyncError(async (req, res, next) => {
    let result = await categoryModel.find();
    res.status(201).json({ message: "success", data: result });
});

const getCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await categoryModel.findById(id);
    !result && next(new AppError(`category not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

const updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let result = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    !result && next(new AppError(`category not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await categoryModel.findByIdAndDelete(id);
    !result && next(new AppError(`category not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

export {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};