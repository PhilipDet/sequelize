import express from "express";
import { PostModel } from "../models/post.js";

export const postController = express.Router();

postController.get("/posts", async (req, res) => {});

postController.get("/posts/:id`([0-9]*)", async (req, res) => {});

postController.post("/posts", async (req, res) => {});

postController.put("/posts/:id`([0-9]*)", async (req, res) => {});

postController.delete("/posts/:id`([0-9]*)", async (req, res) => {
    const { id } = req.params;

    PostModel.destroy({
        where: { id: id },
    });
});
