
import { createServer } from "http";
import  {Server}  from "socket.io";


//socket io
const httpServer = createServer();
const io = new Server(httpServer, {

});

const totalListeners = new Set()
const totalNarrators = new Set()



io.on('connection', function (client) {


  console.log('client connect...', client.id);

  

  client.on('connect', function () {

  })

  client.on('disconnect', function () {
    console.log(client.id + " disconnected from server")
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })

  client.on('destroy-connection',(id)=>{
    console.log(id+" requested destroy")
    totalListeners.delete(client.id)
    totalNarrators.delete(client.id)
    io.emit("listener-count",totalListeners.size)
    io.emit("narrator-count",totalNarrators.size)
    client.disconnect();
  }) 

  client.on("join-as-listener",(id)=>{
    totalListeners.add(client.id);
    console.log(client.id+" joined as listener and "+totalListeners.size+" are on server");
    io.emit("listener-count",totalListeners.size)
    matcher(io)
  })


  client.on("join-as-narrator",(id)=>{
    totalNarrators.add(client.id);
    console.log(client.id+" joined as narrator and "+totalNarrators.size+" are on server");
    io.emit("narrator-count",totalNarrators.size)
    matcher(io)
  })

  client.on("send-message",(messageDetails)=>{
    io.to(messageDetails.to).emit("handle-message",messageDetails)
  })

  client.on("disconnect-chat",(toId)=>{
    io.to(toId).emit("disconnect-chat-handle")
  })



})


const matcher = (io)=>{
  const randomListenerIndex = Math.floor((Math.random() * totalListeners.size));
  const randomNarratorIndex = Math.floor((Math.random() * totalNarrators.size))
  const randomListener =Array.from(totalListeners)[randomListenerIndex];
  const randomNarrator =Array.from(totalNarrators)[randomNarratorIndex];
  if(randomListener && randomNarrator){
    //remove narrator and listener from queue match them and connect each other

    const targetId = io.id == randomListener ? randomNarrator : randomListener;
    const toId = io.id == randomListener ? randomListener : randomNarrator;
    io.to(toId).emit("room-connect",targetId)
    io.to(targetId).emit("room-connect",toId)

  }
}


export  {
    httpServer
}