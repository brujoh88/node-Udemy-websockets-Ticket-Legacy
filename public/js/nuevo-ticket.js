const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCrear = document.querySelector('button')

console.log('Nuevo Ticket HTML');

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true
});

socket.on('ultimo-ticket',(payload)=>{
    lblNuevoTicket.innerText = "Ticket "+payload

})





btnCrear.addEventListener( 'click', () => {    
    
    socket.emit( 'crear_ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket
    });

});