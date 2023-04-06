import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'user name is required'],
        minLength: [1, 'too short user name']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        minLength: 1,
        unique: [true, 'email must be unique']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [6, 'password must be at least 6 characters']
    },
    phone: {
        type: String,
        required: [true, 'phone number is required'],
    },
    profilePic: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export const userModel = mongoose.model('user', userSchema);