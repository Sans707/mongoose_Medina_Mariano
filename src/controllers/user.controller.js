import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";



export const createUser = async (req, res) => {
    try {

        const data = matchedData(req, {
            locations: ["body"]
        });

        const newUser = await UserModel.create(data);

        return res.status(201).json({
            message: "Usuario creado correctamente",
            data: newUser
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
};



export const getAllUsers = async (req, res) => {
    try {

        const users = await UserModel.find();

        return res.status(200).json({
            message: "Usuarios obtenidos correctamente",
            data: users
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener los usuarios",
            error: error.message
        });
    }
};



export const getUserById = async (req, res) => {
    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "Usuario encontrado correctamente",
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al obtener el usuario",
            error: error.message
        });
    }
};



export const updateUser = async (req, res) => {
    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const data = matchedData(req, {
            locations: ["body"]
        });

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            message: "Usuario actualizado correctamente",
            data: updatedUser
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message
        });
    }
};



export const deleteUser = async (req, res) => {
    try {

        const { id } = matchedData(req, {
            locations: ["params"]
        });

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        user.isActive = false;

        await user.save();

        return res.status(200).json({
            message: "Usuario eliminado lógicamente",
            data: user
        });

    } catch (error) {

        return res.status(500).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
};