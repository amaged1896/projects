import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
});

export const getCategory = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

export const updateCategory = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).max(20)
});