import express from "express";
import { PostModel } from "../models/post.js";
import { ImageModel } from "../models/image.js";

export const postController = express.Router();

postController.get("/posts", async (req, res) => {
    try {
        const posts = await PostModel.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke hente opslagene.",
            error: error,
        });
    }
});

postController.get("/posts/:id([0-9]+)", async (req, res) => {
    try {
        const { id } = req.params;

        const post = await PostModel.findOne({
            where: {
                id: id,
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Opslaget findes ikke." });
        }

        res.json(post);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke finde opslaget.",
            error: error,
        });
    }
});

postController.post("/posts", async (req, res) => {
    const { user_id, content, images } = req.body;

    console.log(typeof images);

    const parsedImages = JSON.parse(images);

    console.log(parsedImages);

    if (!user_id || !images) {
        return res.status(400).json({ message: "Mangler påkrævede felter." });
    }

    try {
        const post = await PostModel.create({ user_id, content });

        parsedImages.forEach(async (image) => {
            console.log(image);

            await ImageModel.create({
                post_id: post.id,
                image: image,
            });
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke oprette opslaget.",
            error: error,
        });
    }
});

postController.put("/posts/:id([0-9]+)", async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostModel.findOne({
            where: {
                id: id,
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Opslaget findes ikke." });
        }

        await post.update(req.body);

        res.json(post);
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke opdatere opslaget.",
            error: error,
        });
    }
});

postController.delete("/posts/:id([0-9]+)", async (req, res) => {
    const { id } = req.params;

    try {
        const post = PostModel.findOne({
            where: {
                id: id,
            },
        });

        if (!post) {
            return res.status(404).json({ message: "Opslaget findes ikke." });
        }

        await post.destroy();

        res.json({ message: "Opslaget blev slettet." });
    } catch (error) {
        res.status(500).send({
            message: "Fejl! Kunne ikke slette opslaget.",
            error: error,
        });
    }
});
