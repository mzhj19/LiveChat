const express = require('express');
const app = express();
const http =require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));




app.get('/',(req,res)=>{
    res.sendFile((__dirname) + '/index.html');
})



http.listen(PORT,()=>{  // socket works on http
    console.log(`server is running at: http://localhost:${PORT}`);
})




io.on('connection',(socket) =>{   // socket comming from the client
    console.log(`Client is connected ${socket.id}`);

    // get UserMessage even from client
    socket.on("userMessage",(data)=>{
        io.sockets.emit("userMessage",data)
    })

    // get UserTyping even from client
    socket.on('userTyping',(data)=>{
        socket.broadcast.emit('userTyping',data)
    })
})
