var socket = io();
var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lbltickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblescritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', (data) => {
    actualizarHtml(data.last);
});

socket.on('estadoLast', (data) => {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHtml(data.last);
});

function actualizarHtml(last) {
    for (var i = 0; i <= last.length - 1; i++) {
        lbltickets[i].text('Ticket' + last[i].numero);
        lblescritorios[i].text('Escritorio' + last[i].escritorio);
    }
}