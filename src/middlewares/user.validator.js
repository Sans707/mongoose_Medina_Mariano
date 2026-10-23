import { body, param } from "express-validator";
import { UserModel } from "../models/user.model.js";


export const createUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser texto")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Debe ingresar un email válido")
        .normalizeEmail()
        .custom(async (email) => {
            const userExists = await UserModel.findOne({ email });

            if (userExists) {
                throw new Error("El email ya está registrado");
            }

            return true;
        }),

    body("age")
        .notEmpty()
        .withMessage("La edad es obligatoria")
        .isInt({ min: 1, max: 120 })
        .withMessage("La edad debe ser un número entre 1 y 120")
        .toInt(),

    body("address.street")
        .trim()
        .notEmpty()
        .withMessage("La calle es obligatoria")
        .isLength({ min: 3, max: 100 })
        .withMessage("La calle debe tener entre 3 y 100 caracteres"),

    body("address.city")
        .trim()
        .notEmpty()
        .withMessage("La ciudad es obligatoria")
        .isLength({ min: 2, max: 100 })
        .withMessage("La ciudad debe tener entre 2 y 100 caracteres"),

    body("address.province")
        .trim()
        .notEmpty()
        .withMessage("La provincia es obligatoria")
        .isLength({ min: 2, max: 100 })
        .withMessage("La provincia debe tener entre 2 y 100 caracteres")
];


export const updateUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .isString()
        .withMessage("El nombre debe ser texto")
        .isLength({ min: 3, max: 100 })
        .withMessage("El nombre debe tener entre 3 y 100 caracteres"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("El email es obligatorio")
        .isEmail()
        .withMessage("Debe ingresar un email válido")
        .normalizeEmail()
        .custom(async (email, { req }) => {

            const userExists = await UserModel.findOne({ email });

            if (
                userExists &&
                userExists._id.toString() !== req.params.id
            ) {
                throw new Error("El email ya está registrado");
            }

            return true;
        }),

    body("age")
        .notEmpty()
        .withMessage("La edad es obligatoria")
        .isInt({ min: 1, max: 120 })
        .withMessage("La edad debe ser un número entre 1 y 120")
        .toInt(),

    body("address.street")
        .trim()
        .notEmpty()
        .withMessage("La calle es obligatoria"),

    body("address.city")
        .trim()
        .notEmpty()
        .withMessage("La ciudad es obligatoria"),

    body("address.province")
        .trim()
        .notEmpty()
        .withMessage("La provincia es obligatoria")
];


export const userIdValidation = [
    param("id")
        .isMongoId()
        .withMessage("El ID del usuario no es válido")
];