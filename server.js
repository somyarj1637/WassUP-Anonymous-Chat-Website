const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


http.listen(process.env.PORT || 8080, () => {
    console.log('Chat app server started!')
    console.log('http://localhost:8080')
})


//Socket
io.on("connection", (socket) => {
    console.log('Connected!')

    socket.on('message', (msg) => {
        //console.log(msg);
        socket.broadcast.emit('message', msg);
    })
})