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
    isVolunteer:{
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
    },
    name:{
        type:Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    gender:{
        type: Sequelize.STRING
    }

});
