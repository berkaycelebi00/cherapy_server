import Sequelize from "sequelize";
import { sequelize } from "./db_config.js";

export default sequelize.define("calendar", {
    professionalId: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },
    date:{
        type:Sequelize.DATE
    }

});
