import { matchedData } from "express-validator";

import { CategoryModel } from "../models/category.model.js";
import { PostModel } from "../models/post.model.js";

export const createCategory = async (req, res) => {

    try {

        const data = matchedData(req, {
            locations: ["body"]
        });

        const newCategory = await CategoryModel.create(data);

        return res.status(201).json({
            message: "Categoría creada correctamente",
            data: newCategory
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al crear la categoría",
            error: error.message
        });
    }
};


export const getAllCategories = async (req, res) => {

    try {

        const categories = await CategoryModel.find()
            .populate("posts");

        return res.status(200).json({
            message: "Categorías obtenidas correctamente",
            data: categories
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener las categorías",
            error: error.message
        });
    }
};


export const getCategoryById = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const category = await CategoryModel.findById(id)
            .populate("posts");


        if (!category) {

            return res.status(404).json({
                message: "Categoría no encontrada"
            });
        }


        return res.status(200).json({
            message: "Categoría encontrada correctamente",
            data: category
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener la categoría",
            error: error.message
        });
    }
};


export const updateCategory = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const data = matchedData(req, {
            locations: ["body"]
        });

        const updatedCategory =
            await CategoryModel.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            ).populate("posts");


        if (!updatedCategory) {

            return res.status(404).json({
                message: "Categoría no encontrada"
            });
        }


        return res.status(200).json({
            message: "Categoría actualizada correctamente",
            data: updatedCategory
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al actualizar la categoría",
            error: error.message
        });
    }
};


export const deleteCategory = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const category = await CategoryModel.findById(id);


        if (!category) {

            return res.status(404).json({
                message: "Categoría no encontrada"
            });
        }


        category.isActive = false;

        await category.save();


        return res.status(200).json({
            message: "Categoría eliminada lógicamente",
            data: category
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar la categoría",
            error: error.message
        });
    }
};


export const addCategoryToPost = async (req, res) => {

    try {

        const { postId, categoryId } = matchedData(req, {
            locations: ["body"]
        });


        const post = await PostModel.findById(postId);

        const category =
            await CategoryModel.findById(categoryId);


        if (!post.categories.includes(categoryId)) {

            post.categories.push(categoryId);

            await post.save();
        }


        if (!category.posts.includes(postId)) {

            category.posts.push(postId);

            await category.save();
        }


        return res.status(200).json({
            message: "Categoría vinculada al post correctamente"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al vincular categoría con post",
            error: error.message
        });
    }
};