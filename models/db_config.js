import Sequelize from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.DIALECT,
    logging: true
});




export { sequelize }