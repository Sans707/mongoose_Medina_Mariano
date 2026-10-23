import { matchedData } from "express-validator";

import { ProfileModel } from "../models/profile.model.js";


// CREAR PERFIL
export const createProfile = async (req, res) => {

    try {

        const data = matchedData(req, {
            locations: ["body"]
        });

        const newProfile = await ProfileModel.create(data);

        return res.status(201).json({
            message: "Perfil creado correctamente",
            data: newProfile
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al crear el perfil",
            error: error.message
        });
    }
};


// OBTENER TODOS LOS PERFILES
export const getAllProfiles = async (req, res) => {

    try {

        const profiles = await ProfileModel.find()
            .populate("user");

        return res.status(200).json({
            message: "Perfiles obtenidos correctamente",
            data: profiles
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener los perfiles",
            error: error.message
        });
    }
};


// OBTENER PERFIL POR ID
export const getProfileById = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const profile = await ProfileModel.findById(id)
            .populate("user");

        if (!profile) {

            return res.status(404).json({
                message: "Perfil no encontrado"
            });
        }

        return res.status(200).json({
            message: "Perfil encontrado correctamente",
            data: profile
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener el perfil",
            error: error.message
        });
    }
};


// ACTUALIZAR PERFIL
export const updateProfile = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const data = matchedData(req, {
            locations: ["body"]
        });

        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        ).populate("user");


        if (!updatedProfile) {

            return res.status(404).json({
                message: "Perfil no encontrado"
            });
        }


        return res.status(200).json({
            message: "Perfil actualizado correctamente",
            data: updatedProfile
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al actualizar el perfil",
            error: error.message
        });
    }
};


// ELIMINACIÓN LÓGICA
export const deleteProfile = async (req, res) => {

    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const profile = await ProfileModel.findById(id);


        if (!profile) {

            return res.status(404).json({
                message: "Perfil no encontrado"
            });
        }


        profile.isActive = false;

        await profile.save();


        return res.status(200).json({
            message: "Perfil eliminado lógicamente",
            data: profile
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar el perfil",
            error: error.message
        });
    }
};