import { body, param } from "express-validator";

import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";


export const createProfileValidation = [

    body("bio")
        .trim()
        .notEmpty()
        .withMessage("La biografía es obligatoria")
        .isString()
        .withMessage("La biografía debe ser texto")
        .isLength({ min: 5, max: 300 })
        .withMessage("La biografía debe tener entre 5 y 300 caracteres"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("El teléfono es obligatorio")
        .isString()
        .withMessage("El teléfono debe ser texto")
        .isLength({ min: 8, max: 20 })
        .withMessage("El teléfono debe tener entre 8 y 20 caracteres"),

    body("user")
        .notEmpty()
        .withMessage("El usuario es obligatorio")
        .isMongoId()
        .withMessage("El ID del usuario no es válido")

        .custom(async (userId) => {

            const userExists = await UserModel.findById(userId);

            if (!userExists) {
                throw new Error("El usuario relacionado no existe");
            }

            return true;
        })

        .custom(async (userId) => {

            const profileExists = await ProfileModel.findOne({
                user: userId
            });

            if (profileExists) {
                throw new Error("Este usuario ya tiene un perfil");
            }

            return true;
        })
];


export const updateProfileValidation = [

    body("bio")
        .trim()
        .notEmpty()
        .withMessage("La biografía es obligatoria")
        .isString()
        .withMessage("La biografía debe ser texto")
        .isLength({ min: 5, max: 300 })
        .withMessage("La biografía debe tener entre 5 y 300 caracteres"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("El teléfono es obligatorio")
        .isString()
        .withMessage("El teléfono debe ser texto")
        .isLength({ min: 8, max: 20 })
        .withMessage("El teléfono debe tener entre 8 y 20 caracteres")
];



export const profileIdValidation = [

    param("id")
        .isMongoId()
        .withMessage("El ID del perfil no es válido")
];