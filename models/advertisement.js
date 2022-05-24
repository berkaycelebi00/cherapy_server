import Sequelize from "sequelize";
import { sequelize } from "./db_config.js";

export default sequelize.define("advertiesments", {
    imageUrl: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    professionalId:{
        type:Sequelize.INTEGER
    }

});
