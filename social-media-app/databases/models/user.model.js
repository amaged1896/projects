import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        default: 'not activated',
        enum: ['not activated', 'activated'],
    },
    profileImage: {
        type: String,
        default: 'default.jpg'
    }
}, { timestamps: true });

export const userModel = mongoose.model("user", userSchema);