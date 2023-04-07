import express from 'express';
import * as brand from './brand.controller.js';
const brandRouter = express.Router();

brandRouter
    .route('/')
    .post(brand.createBrand)
    .get(brand.createBrand);

brandRouter
    .route(':id')
    .get(brand.getBrand)
    .put(brand.updateBrand)
    .delete(brand.deleteBrand);

export default brandRouter;