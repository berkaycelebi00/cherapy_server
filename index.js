import express, { json, urlencoded } from 'express';
import routers from './routers/index.js';
import { sequelize } from "./models/db_config.js";
import { db } from './models/index.js';
import errorHandler from "./middlewares/error/error_handler.js";
import cors from 'cors';
import dotenv from 'dotenv'
import { createServer } from "http";
import  {Server}  from "socket.io";



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
const httpServer = createServer();
const io = new Server(httpServer, {

});

io.on('connection', function (client) {

  console.log('client connect...', client.id);

  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
    
  })

  client.on('join-as-listener',(id)=>{
    console.log(id+" joined as listener")
  })

  client.on('message', function name(data) {
    console.log(data);
    io.emit('message', data)
  })

  client.on('location', function name(data) {
    console.log(data);
    io.emit('location', data);
  })

  client.on('connect', function () {
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})



app.listen(PORT, () => {
  console.log(`Cherapy app listening on port ${PORT}`)
})

httpServer.listen(3001,function (err) {
  if (err) throw err
  console.log('Socket Listening on port %d', 3001);
});