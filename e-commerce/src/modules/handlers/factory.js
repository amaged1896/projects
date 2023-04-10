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
        // 1) pagination

        let page = req.query.page || 1;
        if (req.query.page <= 0) page = 1;
        let skip = (page - 1) * 5;
        // 2) filtration

        let filterdObject = { ...req.query };
        let excludedQuery = ['page', 'sort', 'fields', 'keyword'];
        excludedQuery.forEach((query) => delete filterdObject[query]);
        console.log(filterdObject);

        filterdObject = JSON.stringify(filterdObject);
        filterdObject = filterdObject.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        filterdObject = JSON.parse(filterdObject);
        console.log(filterdObject);
        // build query
        let mongooseQuery = model.find(filterdObject).skip(skip).limit(5);
        // 3) sort

        if (req.query.sort) {
            console.log(req.query.sort);
            let sortedBy = req.query.sort.split(',').join(' ');
            console.log(sortedBy);
            mongooseQuery.sort(req.query.sort);
        }

        // 3) search
        if (req.query.keyword) {
            mongooseQuery.find({
                $or: [
                    { title: { $regex: req.query.keyword, $options: 'i' } },
                    { description: { $regex: req.query.keyword, $options: 'i' } },]
            });
        }
        // 5) selected fields
        if (req.query.fields) {
            console.log(req.query.fields);
            let fields = req.query.fields.split(',').join(' ');
            console.log(fields);
            mongooseQuery.select(fields);
        }

        // execute query
        let result = await mongooseQuery;
        !result && next(new AppError('Document not found', 404));
        result && res.status(201).json({ message: "success", page, data: result });
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