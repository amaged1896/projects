import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minlength: [3, 'too short brand name'],
    },
    logo: String,
}, { timestamps: true });

export const brandModel = mongoose.model('brand', brandSchema);