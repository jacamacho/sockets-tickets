var socket = io();
var searchParmas = new URLSearchParams(window.location.search);

if (!searchParmas.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParmas.get('escritorio');
var label = $('small');
$('h1').text('Escritorio ' + escritorio);
$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio }, (data) => {
        if (data === 'No hay tickets') {
            label.text(data);
            return;
        }
        label.text(data.numero);
    });
});