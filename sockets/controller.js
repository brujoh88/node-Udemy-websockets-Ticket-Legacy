const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl()

const socketController = (socket) => {       


    //Cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticketControl.ultimo)
    socket.emit('estado-actual',ticketControl.ultimosCuatros)
    socket.emit('tickets-pendientes', ticketControl.tickets.length)

    socket.on('crear_ticket', ( payload, callback ) => {       


        const crearTicket = ticketControl.siguiente()
        callback(crearTicket)
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
    })

    socket.on('antender-ticket',({escritorio},callback)=>{
       if (!escritorio) {
        return callback({
            ok: false,
            msg: "El escritorio es obligatorio"
        })
       }
       const ticket = ticketControl.atenderTicket(escritorio)
       socket.broadcast.emit('estado-actual',ticketControl.ultimosCuatros)
       socket.emit('tickets-pendientes', ticketControl.tickets.length)
       socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length)
       if (!ticket) {
        return callback({
            ok: false,
            msg: "Ya no hay mas ticket"
        })                
       }
       return callback({
        ok: true,
        ticket
    })
       
    })

}



module.exports = {
    socketController
}

