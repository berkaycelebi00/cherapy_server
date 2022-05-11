
import user from "./user.js";
import role from "./role.js";
import content from "./content.js";
const db = {};
db.role = role;
db.user = user;
db.content = content;
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


db.ROLES = ["user", "admin", "professional"];
export {
    user,
    role,
    db
};
