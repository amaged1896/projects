import mongoose from "mongoose";
import { categoryModel } from './../../../databases/models/category.model.js';
import slug from 'slugify';
import slugify from "slugify";

const createCategory = async (req, res, next) => {
    const { name } = req.body;
    let result = new categoryModel({ name, slug: slugify(name) });
    await result.save();
    res.status(201).json({ message: "success", data: result });
};



const getAllCategories = async (req, res, next) => {
    let result = await categoryModel.find();
    res.status(201).json({ message: "success", data: result });
};


const getCategory = async (req, res, next) => {
    const { id } = req.params;
    let result = await categoryModel.findById(id);
    if (!result) return res.status(404).json({ message: "category not found" });
    res.status(201).json({ message: "success", data: result });
};

const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let result = await categoryModel.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
    if (!result) return res.status(404).json({ message: "category not found" });
    res.status(201).json({ message: "success", data: result });
};

const deleteCategory = async (req, res, next) => {
    const { id } = req.params;
    let result = await categoryModel.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "category not found" });
    res.status(201).json({ message: "success", data: result });
};

export {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
};