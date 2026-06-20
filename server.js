const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const cors=require("cors");
const app=express();
app.use(cors());
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});
io.on("connection",socket=>{
 socket.on("join",room=>socket.join(room));
 socket.on("message",data=>io.to(data.room).emit("message",data));
 socket.on("image",data=>io.to(data.room).emit("image",data));
});
app.get('/',(req,res)=>res.send('CodeChat backend running'));
const PORT=process.env.PORT||3000;
server.listen(PORT,()=>console.log('Running on '+PORT));