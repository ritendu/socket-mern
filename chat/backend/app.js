const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
var cors = require('cors')
app.use(express.json())
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test').then(()=>{
    console.log('Connection Successful')
}).catch(err=>{
    console.log(err)
})
const appRoutes = require('./routes/user.route')
app.use(cors());
app.options("*", cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
    //   methods: ["GET", "POST"],
    },
  });
app.use('/v1',appRoutes)

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
  socket.on('create-room',(data)=>{
    console.log(data,"data")
    socket.join(data.roomId)
  })

 socket.on("send_message", (data) => {
  console.log(data,"?????????????")
      socket.to(data.roomId).emit("receive_message", data);
    });
    // socket.on("join_room", (data) => {
    //   socket.join(data);
    // });
  
    // socket.on("send_message", (data) => {
    //   socket.to(data.room).emit("receive_message", data);
    // });
  });

server.listen(4000, () => {
    console.log("SERVER IS RUNNING");
  });