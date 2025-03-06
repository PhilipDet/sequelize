import express from "express";
import { UserModel } from "../models/user.js";
import { RoleModel } from "../models/role.js";

export const userController = express.Router();

userController.get("/users", async (req, res) => {
    try {
        const users = await UserModel.findAll({
            attributes: ["id", "username", "email"],
            include: {
                model: RoleModel,
                attributes: ["name"],
            },
            // order: [["id", "ASC"]],
            // where: {
            //     id: 1,
            // },
            // limit: 1,
        });
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Fejl! Kunne ikke hente brugere.");
    }
});

userController.get("/users/:id([0-9]+)", async (req, res) => {
    try {
        const { id } = req.params;

        const user = await UserModel.findOne({
            where: {
                id: id,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Brugeren findes ikke." });
        }

        res.json(user);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke finde brugeren.",
            error: error,
        });
    }
});

userController.post("/users", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Mangler påkrævede felter." });
    }

    try {
        const user = await UserModel.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke oprette brugeren.",
            error: error,
        });
    }
});

userController.put("/users/:id([0-9]+)", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findOne({
            where: {
                id: id,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Brugeren findes ikke." });
        }

        await user.update(req.body);

        res.json(user);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke opdatere brugeren.",
            error: error,
        });
    }
});

userController.delete("/users/:id([0-9]+)", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.findOne({
            where: {
                id: id,
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Brugeren findes ikke." });
        }

        await user.destroy();

        res.json({ message: "Brugeren blev slettet." });
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke slette brugeren.",
            error: error,
        });
    }
});
