import mongoose from "mongoose";
import slugify from "slugify";
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: String,
}, { timestamps: true });

categorySchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
});

export const categoryModel = mongoose.model('category', categorySchema);