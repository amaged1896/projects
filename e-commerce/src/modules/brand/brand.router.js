import express from 'express';
import * as brand from './brand.controller.js';
const brandRouter = express.Router();

brandRouter
    .route('/')
    .post(brand.createBrand)
<<<<<<< HEAD
    .get(brand.getAllBrands);
=======
    .get(brand.createBrand);
>>>>>>> 3e5dda55d5f5802e6cd2d11bb6305f11a6b308cf

brandRouter
    .route('/:id')
    .get(brand.getBrand)
    .put(brand.updateBrand)
    .delete(brand.deleteBrand);

export default brandRouter;