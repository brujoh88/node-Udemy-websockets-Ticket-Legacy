const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl()

const socketController = (socket) => {       


    socket.emit('ultimo-ticket', ticketControl.ultimo)

    socket.on('crear_ticket', ( payload, callback ) => {       


        const crearTicket = ticketControl.siguiente()
        callback(crearTicket)
        //TODO notificar un nuevo ticket pendiente de asignar

    })

    socket.on('antender-ticket',({escritorio},callback)=>{
       if (!escritorio) {
        return callback({
            ok: false,
            msg: "El escritorio es obligatorio"
        })
       }
       const ticket = ticketControl.atenderTicket(escritorio)
       //TODO Notificar cambios en los ultimosCuatros
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

