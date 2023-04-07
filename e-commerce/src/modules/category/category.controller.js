import mongoose from "mongoose";
import { categoryModel } from './../../../databases/models/category.model.js';
import slugify from "slugify";


const catchAsyncError = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            next(error);
        });
    };
};

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
    if (!result) return next(new AppError(`category not found`, 404));
    res.status(201).json({ message: "success", data: result });
});

const updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let result = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!result) return next(new AppError(`category not found`, 404));
    res.status(201).json({ message: "success", data: result });
});

const deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await categoryModel.findByIdAndDelete(id);
    if (!result) return next(new AppError(`category not found`, 404));
    res.status(201).json({ message: "success", data: result });
});

export {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};