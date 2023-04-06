import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userComment: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true
    }
}, { timestamps: true });

export const commentModel = mongoose.model('comment', commentSchema);