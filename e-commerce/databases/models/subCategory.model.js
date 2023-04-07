import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short subCategory name'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
}, { timestamps: true });

subCategorySchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
});

export const subCategoryModel = mongoose.model('subCategory', subCategorySchema);