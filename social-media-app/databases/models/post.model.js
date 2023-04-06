import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    likes: {
        type: String,
        default: []
    }
}, { timestamps: true });
export const postModel = mongoose.model('post', postSchema);