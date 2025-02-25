import express from "express";
import { db } from "../config/db.js";

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
