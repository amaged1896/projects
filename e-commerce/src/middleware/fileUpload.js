import multer from "multer";
import { AppError } from "../utlis/AppError.js";


const options = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    });
    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new AppError('images only supported', 400), false);
        }
    }

    return multer({ storage, fileFilter });
};

export const uploadSingleFile = (fieldName, folderName) => options(folderName).single(fieldName);

export const uploadMultipleFiles = (arrOfFields, folderName) => options(folderName).fields(arrOfFields);