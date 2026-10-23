import { ProfileModel } from "../models/profile.model.js";
import { UserModel } from "../models/user.model.js";



export const createProfile = async (req, res) => {
    try {
        const { bio, phone, user } = req.body;

        const userExists = await UserModel.findById(user);

        if (!userExists) {
            return res.status(404).json({
                message: "El usuario relacionado no existe"
            });
        }

        const profileExists = await ProfileModel.findOne({ user });

        if (profileExists) {
            return res.status(400).json({
                message: "Este usuario ya tiene un perfil"
            });
        }

        const newProfile = await ProfileModel.create({
            bio,
            phone,
            user
        });

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


export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;

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



export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, phone } = req.body;

        const updatedProfile = await ProfileModel.findByIdAndUpdate(
            id,
            {
                bio,
                phone
            },
            {
                new: true
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


export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

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