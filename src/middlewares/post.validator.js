import { body, param } from "express-validator";

import { UserModel } from "../models/user.model.js";
import { CategoryModel } from "../models/category.model.js";


export const createPostValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe ser texto")
        .isLength({ min: 3, max: 100 })
        .withMessage("El título debe tener entre 3 y 100 caracteres"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("El contenido es obligatorio")
        .isString()
        .withMessage("El contenido debe ser texto")
        .isLength({ min: 5, max: 1000 })
        .withMessage("El contenido debe tener entre 5 y 1000 caracteres"),

    body("author")
        .notEmpty()
        .withMessage("El autor es obligatorio")
        .isMongoId()
        .withMessage("El ID del autor no es válido")
        .custom(async (authorId) => {

            const userExists = await UserModel.findById(authorId);

            if (!userExists) {
                throw new Error("El usuario autor no existe");
            }

            return true;
        }),

    body("categories")
        .optional()
        .isArray()
        .withMessage("Las categorías deben enviarse como un arreglo"),

    body("categories.*")
        .optional()
        .isMongoId()
        .withMessage("Algún ID de categoría no es válido")
        .custom(async (categoryId) => {

            const categoryExists = await CategoryModel.findById(categoryId);

            if (!categoryExists) {
                throw new Error(
                    `La categoría ${categoryId} no existe`
                );
            }

            return true;
        })
];


export const updatePostValidation = [

    body("title")
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe ser texto")
        .isLength({ min: 3, max: 100 })
        .withMessage("El título debe tener entre 3 y 100 caracteres"),

    body("content")
        .trim()
        .notEmpty()
        .withMessage("El contenido es obligatorio")
        .isString()
        .withMessage("El contenido debe ser texto")
        .isLength({ min: 5, max: 1000 })
        .withMessage("El contenido debe tener entre 5 y 1000 caracteres")
];



export const postIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("El ID del post no es válido")
];