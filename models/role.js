import { db } from "../config/db.js";
import { DataTypes, Model } from "sequelize";

export class RoleModel extends Model {}

RoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        modelName: "role",
        createdAt: true,
        underscored: true,
    }
);
