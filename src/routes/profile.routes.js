import { Router } from "express";

import {
    createProfile,
    getAllProfiles,
    getProfileById,
    updateProfile,
    deleteProfile
} from "../controllers/profile.controller.js";

import {
    createProfileValidation,
    updateProfileValidation,
    profileIdValidation
} from "../middlewares/profile.validator.js";

import { validateResult } from "../middlewares/validateResult.js";


const router = Router();


router.post(
    "/",
    createProfileValidation,
    validateResult,
    createProfile
);


router.get(
    "/",
    getAllProfiles
);


router.get(
    "/:id",
    profileIdValidation,
    validateResult,
    getProfileById
);


router.put(
    "/:id",
    profileIdValidation,
    updateProfileValidation,
    validateResult,
    updateProfile
);


router.delete(
    "/:id",
    profileIdValidation,
    validateResult,
    deleteProfile
);


export default router;