import { brandModel } from './../../../databases/models/brand.model.js';
import { createOne, deleteOne, getAll, getOne, updateOne } from "../handlers/factory.js";

const createBrand = createOne(brandModel);

const getAllBrands = getAll(brandModel);

const getBrand = getOne(brandModel);

const updateBrand = updateOne(brandModel);

const deleteBrand = deleteOne(brandModel);

export {
    createBrand,
    getAllBrands,
    getBrand,
    updateBrand,
    deleteBrand
};