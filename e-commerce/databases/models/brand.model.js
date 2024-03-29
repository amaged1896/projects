import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minlength: [3, 'too short brand name'],
    }, slug: {
        type: String,
        lowercase: true,
    },
    logo: String,
}, { timestamps: true });

brandSchema.pre('save', function (next) {
    this.slug = slugify(this.name);
    next();
});

brandSchema.post('init', (doc) => {
    console.log(doc);
    doc.logo = process.env.BASE_URL + "/brand/" + doc.logo;
});
export const brandModel = mongoose.model('brand', brandSchema);