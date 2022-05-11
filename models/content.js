import Sequelize from "sequelize";
import { sequelize } from "./db_config.js";

export default sequelize.define("content", {
    author: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    content: {
        type: Sequelize.STRING
    },
    imageUrl:{
        type:Sequelize.STRING
    }

});
