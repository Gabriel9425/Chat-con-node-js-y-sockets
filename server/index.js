var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//cargamos la vista con middleware
app.use(express.static('client'));//=> toma los htmls estaticos

app.get('/hola-mundo', function(req,res){
    res.status(200).send("hola mundo desde una ruta");
});

var messages = [{
    id:1,
    text:"Bienvenido al chat de sockets y node js",
    nickname:"bot pc-lenovo"
}];

io.on('connection', function(socket){

    console.log("el equipo con IP: "+ socket.handshake.address + " se ha conectado..");
    socket.emit('messages', messages);

    socket.on('add-message',function(data){
    
        messages.push(data);///guardamos el mensaje para el servidor
    
        io.sockets.emit('messages',messages);
    });


});

server.listen(6677,function(){
console.log("servidor funcionando en local host 6677");

});
