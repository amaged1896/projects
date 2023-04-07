import { catchAsyncError } from "../../middleware/catchAsyncError.js";
import { AppError } from './../../utlis/AppError.js';

const deleteOne = (model) => {
    return catchAsyncError(async (req, res, next) => {
        const { id } = req.params;
        let result = await model.findByIdAndDelete(id);
        !result && next(new AppError(`document not found`, 404));
        result && res.status(201).json({ message: "success", data: result });
    });
};

export {
    deleteOne,
    createOne,
};