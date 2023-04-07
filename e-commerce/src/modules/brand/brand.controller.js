import slugify from "slugify";
import { catchAsyncError } from './../../middleware/catchAsyncError.js';
import { AppError } from './../../utlis/AppError.js';
import { brandModel } from './../../../databases/models/brand.model.js';

const createBrand = catchAsyncError(async (req, res, next) => {
    const { name } = req.body;
    let result = new brandModel({ name, slug: slugify(name) });
    await result.save();
    res.status(201).json({ message: "success", data: result });
});

const getAllBrands = catchAsyncError(async (req, res, next) => {
    let result = await brandModel.find({});
    res.status(201).json({ message: "success", data: result });
});

const getBrand = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await brandModel.findById(id);
    !result && next(new AppError(`Brand not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

const updateBrand = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let result = await brandModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    !result && next(new AppError(`Brand not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

const deleteBrand = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let result = await brandModel.findByIdAndDelete(id);
    !result && next(new AppError(`Brand not found`, 404));
    result && res.status(201).json({ message: "success", data: result });
});

export {
    createBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
};