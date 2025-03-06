import { RoleModel } from "./role.js";
import { UserModel } from "./user.js";

export const setRelations = () => {
    UserModel.belongsTo(RoleModel, {
        foreignKey: "role_id",
    });
    RoleModel.hasMany(UserModel, {
        onDelete: "CASCADE",
        hooks: true,
    });
};
