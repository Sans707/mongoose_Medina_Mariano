import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./src/config/database.js";
import userRoutes from "./src/routes/user.routes.js";

import postRoutes from "./src/routes/post.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/posts", postRoutes);

connectDB();
    
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API MongoDB + Mongoose funcionando correctamente"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});