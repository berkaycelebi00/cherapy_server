import Sequelize from "sequelize";
import { sequelize } from "./db_config.js";

export default sequelize.define("user", {
    username: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },

});
