import express, { json, urlencoded } from 'express';
import routers from './routers/index.js';
import { sequelize } from "./models/db_config.js";
import { db } from './models/index.js';
import errorHandler from "./middlewares/error/error_handler.js";
import cors from 'cors';
import dotenv from 'dotenv'
import {httpServer} from "./socket.js";

dotenv.config()
const app = express();

app.use(cors())
app.use('/public', express.static('public'))

const PORT = process.env.PORT;

app.use(json());
app.use(urlencoded({
  extended: true
}));

app.use("/api", routers);

app.use(errorHandler);
const Role = db.role;
sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Db');
  //initial()

});
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "professional"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

app.listen(PORT, () => {
  console.log(`Cherapy app listening on port ${PORT}`)
})






httpServer.listen(3001,function (err) {
  if (err) throw err
  console.log('Socket Listening on port %d', 3001);
});