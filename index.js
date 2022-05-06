import express, { json, urlencoded } from 'express';
import routers from './routers/index.js';
import { sequelize } from "./models/db_config.js";
import { db } from './models/index.js';
import errorHandler from "./middlewares/error/error_handler.js";
import cors from 'cors';
import dotenv from 'dotenv'


dotenv.config()
const app = express();

app.use(cors())

const PORT = process.env.PORT;

app.use(json());
app.use(urlencoded({
  extended: true
}));

app.use("/api", routers);

app.use(errorHandler);
const Role = db.role;
sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

app.listen(PORT, () => {
  console.log(`Cherapy app listening on port ${PORT}`)
})
