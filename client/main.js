var socket = io.connect('http://192.168.1.39:6677',{'forceNew':true});

socket.on('messages',function(data){
render(data);
console.log(data);
});
function render(data)//me muestra los datos en html
{
    var html = data.map(function(message, index){
            return(`

            <div class="message">
                <strong> ${message.nickname}</strong> Dice : 
                <p>${message.text}</p>

                </div>
           
            
            `);
    }).join(' ');

    var div_msgs= document.getElementById("messages");
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
    

}

function addMessage(e)
{
    var message ={
        nickname : document.getElementById('nickname').value,
        text : document.getElementById('text').value
    };//lo envio al socket para guardarlo

    document.getElementById('nickname').style.display= 'none';
    socket.emit('add-message',message);//guarda el mensaje en el servidor
    return false;//corta la ejecucion de la funcion

}