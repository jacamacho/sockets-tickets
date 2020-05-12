//Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');
socket.on('connect', () => {
    console.log('Conectado al server');
});

socket.on('disconnect', () => {
    console.log('Perdimos conexión');
});

socket.on('estadoActual', (data) => {
    label.text(data.actual);
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});