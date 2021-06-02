const fs = require('fs')
const path = require('path')

module.exports = {
    usersPath : path.resolve(__dirname + '/users.json'),
    readFile(){
        const usersJson = JSON.parse(fs.readFileSync(this.usersPath, 'utf-8'))
        return  usersJson
    },

    writeFile(newData){
        console.log('Ingreso a writeFile')
        console.log('recibo por parametros')
        console.log(newData)
        fs.writeFileSync(this.usersPath, JSON.stringify(newData, null, 2))
        return newData
    },

    generateId(){
        console.log('Ingrese a generate ID')
        return this.readFile().pop().id + 1
    },

    createUser(newUser) {
        newUser.id = this.generateId()
        const userJson = this.readFile()
        const usersUpdated = [...userJson, newUser]
        this.writeFile(usersUpdated)
        return newUser
    },

    validateUser(user) {
        users = this.readFile()
        const findUser = users.find(e => e.email === user.email)
        if (findUser === undefined) {
            return 'El usuario no existe'
        } else if (findUser.password == user.password) {
            return 'Acceso concedido'
        } else {
            return 'El usuario o la contraseña son incorrectos'
        }

    }

}


