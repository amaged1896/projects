import { createOne, deleteOne, getAll, getOne, updateOne } from '../handlers/factory.js';
import { productModel } from './../../../databases/models/product.model.js';

const createProduct = createOne(productModel);

const getAllProducts = getAll(productModel);

const getProduct = getOne(productModel);

const updateProduct = updateOne(productModel);

const deleteProduct = deleteOne(productModel);

export {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct
};