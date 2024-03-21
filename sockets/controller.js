const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl()

const socketController = (socket) => {       


    socket.emit('ultimo-ticket', ticketControl.ultimo)

    socket.on('crear_ticket', ( payload, callback ) => {       


        const crearTicket = ticketControl.siguiente()
        callback(crearTicket)
        //TODO notificar un nuevo ticket pendiente de asignar

    })

}



module.exports = {
    socketController
}

