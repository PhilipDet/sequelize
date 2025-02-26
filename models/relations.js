import { RoleModel } from "./role.js";
import { UserModel } from "./user.js";

export const setRelations = () => {
    UserModel.belongsTo(RoleModel);
    RoleModel.hasMany(UserModel);
};
