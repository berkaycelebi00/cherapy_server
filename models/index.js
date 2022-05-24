
import user from "./user.js";
import role from "./role.js";
import content from "./content.js";
import client from "./client.js";
import advertisement from "./advertisement.js";
import calendar from "./calendar.js";
const db = {};
db.role = role;
db.user = user;
db.content = content;
db.client = client;
db.advertisement = advertisement;
db.calendar = calendar;
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
db.professional = client.belongsTo(user,{foreignKey:"professionalId",as:"professionalUser"})
db.clientUser = client.belongsTo(user,{foreignKey:"clientId",as:"clientuser"})
db.ad = advertisement.belongsTo(user,{foreignKey:"professionalId"})
db.cal = calendar.belongsTo(user,{foreignKey:"professionalId"})

db.ROLES = ["user", "admin", "professional"];
export {
    user,
    role,
    advertisement,
    calendar,
    db
};
