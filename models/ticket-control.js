const path = require('path')
const fs = require('fs')

class Ticket{
    constructor( numero, escritorio){
        this.numero = numero
        this.escritorio = escritorio
    }
}

class TicketControl {
    constructor(){
        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimosCuatros = []

        this.init()
    }

    get toJson(){
        return{
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets:this.tickets,
            ultimosCuatros:this.ultimosCuatros
        }        
    }

    init(){
        const {hoy, tickets, ultimosCuatros, ultimo} = require('../db/data.json')
        
        if (hoy === this.hoy) {
            this.tickets = tickets
            this.ultimo = ultimo
            this.ultimosCuatros = ultimosCuatros           
        }else{
            this.guardarDB()
        }
    }

    guardarDB(){
        const dbPath = path.join(__dirname,'../db/data.json')
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
    }

    siguiente(){
        this.ultimo ++
        const ticket = new Ticket(this.ultimo, null)
        this.tickets.push(ticket)
        this.guardarDB()
        return 'Ticket ' + ticket.numero
    }

    atenderTicket(escritorio) {

        // No tenemos tickets
        if ( this.tickets.length === 0 ) {
            return null;
        }

        const ticket = this.tickets.shift(); // this.tickets[0];
        ticket.escritorio = escritorio;

        this.ultimosCuatros.unshift( ticket );

        if ( this.ultimosCuatros.length > 4 ) {
            this.ultimosCuatros.splice(-1,1);
        }

        this.guardarDB();

        return ticket;
    }
}

module.exports = TicketControl