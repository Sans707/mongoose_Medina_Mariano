import { matchedData } from "express-validator";

import { PostModel } from "../models/post.model.js";

export const createPost = async (req, res) => {

    try {

        const data = matchedData(req, {
            locations: ["body"]
        });

        const newPost = await PostModel.create(data);

        return res.status(201).json({
            message: "Post creado correctamente",
            data: newPost
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al crear el post",
            error: error.message
        });
    }
};

export const getAllPosts = async (req, res) => {

    try {

        const posts = await PostModel.find()
            .populate("author")
            .populate("categories");

        return res.status(200).json({
            message: "Posts obtenidos correctamente",
            data: posts
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener los posts",
            error: error.message
        });
    }
};


export const getPostById = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const post = await PostModel.findById(id)
            .populate("author")
            .populate("categories");

        if (!post) {

            return res.status(404).json({
                message: "Post no encontrado"
            });
        }

        return res.status(200).json({
            message: "Post encontrado correctamente",
            data: post
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener el post",
            error: error.message
        });
    }
};


export const updatePost = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const data = matchedData(req, {
            locations: ["body"]
        });

        const updatedPost = await PostModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
            .populate("author")
            .populate("categories");


        if (!updatedPost) {

            return res.status(404).json({
                message: "Post no encontrado"
            });
        }


        return res.status(200).json({
            message: "Post actualizado correctamente",
            data: updatedPost
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al actualizar el post",
            error: error.message
        });
    }
};


export const deletePost = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const post = await PostModel.findById(id);


        if (!post) {

            return res.status(404).json({
                message: "Post no encontrado"
            });
        }


        post.isActive = false;

        await post.save();


        return res.status(200).json({
            message: "Post eliminado lógicamente",
            data: post
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar el post",
            error: error.message
        });
    }
};