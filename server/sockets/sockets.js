const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (cliente) => {

    cliente.emit('estadoActual', { actual: ticketControl.statusTicket(), last: ticketControl.getLast() });

    cliente.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        console.log('Cual es el siguiente ticket', siguiente);
        callback(siguiente);
    });

    cliente.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                error: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        cliente.broadcast.emit('estadoLast', { last: ticketControl.getLast() });
        callback(atenderTicket);
        //actualizar / notificar cambios en los ULTIMOS 4
    });
});