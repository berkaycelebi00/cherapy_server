
import user from "./user.js";
import role from "./role.js";

const db = {};
db.role = role;
db.user = user;
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];
export {
    user,
    role,
    db
};
