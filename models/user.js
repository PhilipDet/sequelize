import { db } from "../config/db.js";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import { RoleModel } from "./role.js";

export class UserModel extends Model {}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: RoleModel,
                key: "id",
            },
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize: db,
        modelName: "user",
        createdAt: true,
        underscored: true,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await createHash(user.password);
            },
            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    user.password = await createHash(user.password);
                }
            },
        },
    }
);

const createHash = async (string) => {
    try {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(string, salt);
    } catch (error) {
        throw new Error("Error hashing password");
    }
};
