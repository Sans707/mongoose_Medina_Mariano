import { body, param } from "express-validator";

import { CategoryModel } from "../models/category.model.js";
import { PostModel } from "../models/post.model.js";


export const createCategoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoría es obligatorio")
        .isString()
        .withMessage("El nombre debe ser texto")
        .isLength({ min: 3, max: 50 })
        .withMessage(
            "El nombre debe tener entre 3 y 50 caracteres"
        )
        .custom(async (name) => {

            const categoryExists = await CategoryModel.findOne({
                name
            });

            if (categoryExists) {
                throw new Error("La categoría ya existe");
            }

            return true;
        })
];


export const updateCategoryValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre de la categoría es obligatorio")
        .isString()
        .withMessage("El nombre debe ser texto")
        .isLength({ min: 3, max: 50 })
        .withMessage(
            "El nombre debe tener entre 3 y 50 caracteres"
        )
        .custom(async (name, { req }) => {

            const categoryExists = await CategoryModel.findOne({
                name
            });

            if (
                categoryExists &&
                categoryExists._id.toString() !== req.params.id
            ) {
                throw new Error("La categoría ya existe");
            }

            return true;
        })
];


export const categoryIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("El ID de la categoría no es válido")
];


export const addCategoryToPostValidation = [

    body("postId")
        .notEmpty()
        .withMessage("El ID del post es obligatorio")
        .isMongoId()
        .withMessage("El ID del post no es válido")
        .custom(async (postId) => {

            const postExists = await PostModel.findById(postId);

            if (!postExists) {
                throw new Error("El post no existe");
            }

            return true;
        }),

    body("categoryId")
        .notEmpty()
        .withMessage("El ID de la categoría es obligatorio")
        .isMongoId()
        .withMessage("El ID de la categoría no es válido")
        .custom(async (categoryId) => {

            const categoryExists =
                await CategoryModel.findById(categoryId);

            if (!categoryExists) {
                throw new Error("La categoría no existe");
            }

            return true;
        })
];