import express from "express";
import { UserModel } from "../models/user.js";

export const userController = express.Router();

userController.get("/users", async (req, res) => {
    try {
        const users = await UserModel.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Fejl! Kunne ikke hente brugere.");
    }
});

userController.get("/users/:id`([0-9]*)", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findOne({
            where: {
                id: id,
            },
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Fejl! Kunne ikke finde brugeren.");
    }
});

userController.post("/users", async (req, res) => {});

userController.put("/users/:id`([0-9]*)", async (req, res) => {});

userController.delete("/users/:id`([0-9]*)", async (req, res) => {});
