const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.last = [];
        let data = require('../data/data.json');
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.last = data.last;
        } else {
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarArchivo();
        return `Ticket ${this.ultimo}`;
    }

    statusTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getLast() {
        return this.last;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.last.unshift(atenderTicket);
        if (this.last.length > 4) {
            this.last.splice(-1, 1);
        }
        this.grabarArchivo();
        return atenderTicket;
    }

    grabarArchivo() {
        let jsonData = { ultimo: this.ultimo, hoy: this.hoy, tickets: this.tickets, last: this.last };
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.last = [];
        this.grabarArchivo();
    }
}

module.exports = {
    TicketControl
};