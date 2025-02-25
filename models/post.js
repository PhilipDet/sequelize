import { db } from "../config/db.js";
import { DataTypes, Model } from "sequelize";

export class PostModel extends Model {}

PostModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "post",
        createdAt: true,
        underscored: true,
    }
);
