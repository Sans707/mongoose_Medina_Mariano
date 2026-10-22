import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        street: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        province: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },

        age: {
            type: Number,
            required: true
        },

        address: {
            type: addressSchema,
            required: true
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model("User", userSchema);