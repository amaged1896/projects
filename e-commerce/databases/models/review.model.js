import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        required: [true, 'review comment required'],
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
    },
    user: {
        type: mongoose.types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true });

export const reviewModel = mongoose.model('review', reviewSchema);