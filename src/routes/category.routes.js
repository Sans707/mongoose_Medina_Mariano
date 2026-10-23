import { Router } from "express";

import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    addCategoryToPost
} from "../controllers/category.controller.js";

import {
    createCategoryValidation,
    updateCategoryValidation,
    categoryIdValidation,
    addCategoryToPostValidation
} from "../middlewares/category.validator.js";

import { validateResult } from "../middlewares/validateResult.js";


const router = Router();


router.post(
    "/",
    createCategoryValidation,
    validateResult,
    createCategory
);


router.get(
    "/",
    getAllCategories
);



router.post(
    "/add-post",
    addCategoryToPostValidation,
    validateResult,
    addCategoryToPost
);


router.get(
    "/:id",
    categoryIdValidation,
    validateResult,
    getCategoryById
);


router.put(
    "/:id",
    categoryIdValidation,
    updateCategoryValidation,
    validateResult,
    updateCategory
);


router.delete(
    "/:id",
    categoryIdValidation,
    validateResult,
    deleteCategory
);


export default router;