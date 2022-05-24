import Sequelize from "sequelize";
import { sequelize } from "./db_config.js";

export default sequelize.define("client", {
    professionalId: {
        type: Sequelize.INTEGER
    },
    clientId: {
        type: Sequelize.INTEGER
    },
    note: {
        type: Sequelize.STRING
    },


});
