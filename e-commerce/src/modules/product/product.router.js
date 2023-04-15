import express from 'express';
import * as product from './product.controller.js';
import { uploadMultipleFiles, uploadSingleFile } from '../../middleware/fileUpload.js';
const productRouter = express.Router();

let fieldsArray = [{ name: 'imgCover', maxCount: 1 }, { name: 'images', maxCount: 8 }];

productRouter
    .route('/')
    .post(uploadMultipleFiles(fieldsArray, 'product'), uploadSingleFile('image', 'product'), product.createProduct)
    .get(product.getAllProducts);

productRouter
    .route('/:id')
    .get(product.getProduct)
    .delete(product.deleteProduct)
    .put(product.updateProduct);

export default productRouter;