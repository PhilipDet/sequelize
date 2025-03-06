import express from "express";
import { db } from "../config/db.js";
import { SeedFromCsv } from "../utils/seed.js";
import { UserModel } from "../models/user.js";
import { RoleModel } from "../models/role.js";
import { PostModel } from "../models/post.js";

export const dbController = express.Router();

dbController.get("/db", async (req, res) => {
    try {
        await db.authenticate();
        res.send("Der er forbindelse til databasen");
    } catch (error) {
        console.log(error);

        res.status(500).send("Fejl! Kunne ikke forbinde til databasen.");
    }
});

dbController.get("/sync", async (req, res) => {
    try {
        await db.sync({ force: true });
        res.send("Databasen blev synkroniseret");
    } catch (error) {
        res.status(500).send("Fejl! Kunne ikke synkroniser databasen.");
    }
});

dbController.get("/seed", async (req, res) => {
    try {
        await SeedFromCsv("roles.csv", RoleModel);
        await SeedFromCsv("users.csv", UserModel);
        await SeedFromCsv("posts.csv", PostModel);

        res.send({ message: "Data blev indsat i databasen" });
    } catch (error) {
        res.status(500).send("Fejl! Kunne ikke indsætte data.");
    }
});
