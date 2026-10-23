import { Router } from "express";

import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
} from "../controllers/post.controller.js";

import {
    createPostValidation,
    updatePostValidation,
    postIdValidation
} from "../middlewares/post.validator.js";

import { validateResult } from "../middlewares/validateResult.js";


const router = Router();


router.post(
    "/",
    createPostValidation,
    validateResult,
    createPost
);


router.get(
    "/",
    getAllPosts
);


router.get(
    "/:id",
    postIdValidation,
    validateResult,
    getPostById
);


router.put(
    "/:id",
    postIdValidation,
    updatePostValidation,
    validateResult,
    updatePost
);


router.delete(
    "/:id",
    postIdValidation,
    validateResult,
    deletePost
);


export default router;