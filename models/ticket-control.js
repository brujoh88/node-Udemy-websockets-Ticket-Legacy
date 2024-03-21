const path = require('path')
const fs = require('fs')
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
            this.ticket = tickets
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
}

module.exports = TicketControl