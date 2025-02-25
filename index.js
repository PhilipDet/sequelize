import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

import { db } from "./config/db.js";

// MODELS -----------------------------------------
import { UserModel } from "./models/user.js";
import { PostModel } from "./models/post.js";
import { CommentModel } from "./models/comment.js";
import { ImageModel } from "./models/image.js";
// ------------------------------------------------

// RELATIONS --------------------------------------
// import { setRelations } from "./models/relations.js";
// ------------------------------------------------

// CONTROLLER -------------------------------------
import { dbController } from "./controller/db.js";
import { userController } from "./controller/user.js";
import { postController } from "./controller/post.js";
app.use(dbController);
app.use(userController);
app.use(postController);
// ------------------------------------------------

app.get("/", async (req, res) => {
    res.send("Velkommen!");
});

app.get("*", (req, res) => {
    res.status(404).send("404 - Not Found");
});

app.listen(process.env.PORT, () => {
    console.log(
        "Server is running on port http://localhost:" + process.env.PORT
    );
});
