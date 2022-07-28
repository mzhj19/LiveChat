//instance of socket
const socket = io();
const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    button = document.getElementById('button'),
    typing = document.getElementById('typing');



    message.addEventListener('keypress',()=>{
        socket.emit('userTyping',handle.value)  // send userTyping event to server
    })

 

    button.addEventListener('click',()=>{
        // send to server
        socket.emit('userMessage',{     // send userMessage event to server
            handle : handle.value,
            message : message.value
        })
        document.getElementById('message').value="";
    })

    
    // get from server
    socket.on("userMessage",(data)=>{
        typing.innerHTML ='';
        output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
    })

    // get from the server
    socket.on('userTyping',(data)=>{
        typing.innerHTML = '<p><em>' + data + '  is typing... </em></p>'
    })


