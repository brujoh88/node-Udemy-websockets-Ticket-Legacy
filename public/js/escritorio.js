
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')


const searchParams = new URLSearchParams(window.location.search)

if (!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligarorio')    
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'
const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false
});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true
});

socket.on('ultimo-ticket',(payload)=>{
    //lblNuevoTicket.innerText = "Ticket "+payload

})





btnAtender.addEventListener( 'click', () => {    
    
    socket.emit('antender-ticket', {escritorio},({ok, ticket, msg})=>{
        if (!ok) {
        lblTicket.innerText = `No hay mas por atender.`
            return  divAlerta.style.display = ''            
        }
        lblTicket.innerText = `Ticket ${ticket.numero}`
    })
    /* socket.emit( 'crear_ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket
    }); */

});