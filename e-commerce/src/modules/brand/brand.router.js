import express from 'express';
import * as brand from './brand.controller.js';
import { uploadSingleFile } from '../../middleware/fileUpload.js';
const brandRouter = express.Router();

brandRouter
    .route('/')
    .post(uploadSingleFile('logo', 'brand'), brand.createBrand)
    .get(brand.getAllBrands);

brandRouter
    .route('/:id')
    .get(brand.getBrand)
    .put(brand.updateBrand)
    .delete(brand.deleteBrand);

export default brandRouter;