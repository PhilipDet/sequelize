import { db } from "../config/db.js";
import { DataTypes, Model } from "sequelize";

export class ImageModel extends Model {}

ImageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "image",
        createdAt: true,
        underscored: true,
    }
);
