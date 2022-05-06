import Sequelize from "sequelize";
import { sequelize } from "./db_config.js";

export default sequelize.define("role", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },


});
