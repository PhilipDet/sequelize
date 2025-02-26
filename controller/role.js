import express from "express";
import { RoleModel } from "../models/role.js";

export const roleController = express.Router();

roleController.get("/roles", async (req, res) => {
    try {
        const roles = await RoleModel.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke hente rollerne.",
            error: error,
        });
    }
});
