import { PostModel } from "./post.js";
import { ImageModel } from "./image.js";

export const setRelations = () => {
    PostModel.hasMany(ImageModel, {
        foreignKey: "post_id",
        onDelete: "CASCADE",
    });
    ImageModel.belongsTo(PostModel, {
        foreignKey: "post_id",
    });
};
