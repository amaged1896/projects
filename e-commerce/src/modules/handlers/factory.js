import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from './../../utlis/AppError.js';

const createOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        let result = new model(req.body);
        await result.save();
        if (!result) return next(new AppError('Invalid category', 404));
        res.status(201).json({ message: "success", data: result });
    });
};

const getOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        let result = await model.findById(id);
        !result && next(new AppError('category not found', 404));
        result && res.status(201).json({ message: "success", data: result });
    });
};

const updateOne = (model) => catchAsyncError(async (req, res, next) => {
    let result = await model.findById(req.params.id);
    !result && next(new AppError('Document not found', 404));
    Object.assign(result, req.body);
    await result.save();
    res.status(200).json({ message: 'success', data: result });
});

const getAll = (model) => {
    return catchAsyncError(async (req, res, next) => {
        let filter = {};
        if (req.params.categoryId) filter = { category: req.params.categoryId };
        let result = await model.find(filter);
        !result && next(new AppError('Document not found', 404));
        result && res.status(201).json({ message: "success", data: result });
    });
};

const deleteOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        let result = await model.findByIdAndDelete(id);
        !result && next(new AppError('document not found', 404));
        result && res.status(201).json({ message: "success", data: result });
    });
};

export {
    deleteOne,
    createOne,
    getOne,
    updateOne,
    getAll
};