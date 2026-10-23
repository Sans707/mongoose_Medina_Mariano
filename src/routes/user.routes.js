import { Router } from "express";

import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";

import {
    createUserValidation,
    updateUserValidation,
    userIdValidation
} from "../middlewares/user.validator.js";

import { validateResult } from "../middlewares/validateResult.js";

const router = Router();


router.post(
    "/",
    createUserValidation,
    validateResult,
    createUser
);


router.get(
    "/",
    getAllUsers
);


router.get(
    "/:id",
    userIdValidation,
    validateResult,
    getUserById
);


router.put(
    "/:id",
    userIdValidation,
    updateUserValidation,
    validateResult,
    updateUser
);


router.delete(
    "/:id",
    userIdValidation,
    validateResult,
    deleteUser
);


export default router;