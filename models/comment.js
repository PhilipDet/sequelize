import { db } from "../config/db.js";
import { DataTypes, Model } from "sequelize";

export class CommentModel extends Model {}

CommentModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "comment",
        createdAt: true,
        underscored: true,
    }
);
