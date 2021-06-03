const fs = require('fs')
const path = require('path')



module.exports = {
    //resuelve la ruta de los datos
    usersPath : path.resolve(__dirname + '/users.json'),
    //lee el archivo
    readFile(){
        const usersJson = JSON.parse(fs.readFileSync(this.usersPath, 'utf-8'))
        return  usersJson
    },
    //escribe los datos nuevos en el archivo
    writeFile(newData){
        console.log('Ingreso a writeFile')
        console.log('recibo por parametros')
        console.log(newData)
        return newData
    },
    //crea el nuevo id
    generateId(){
        console.log('Ingrese a generate ID')
        return this.readFile().pop().id + 1
    },
    //crea un nuevo usuario
    create(newUser) {
        newUser.id = this.generateId()
        const userJson = this.readFile()
        const usersUpdated = [...userJson, newUser]
        this.writeFile(usersUpdated)
        return newUser
    },

    //busca si existe el usuario
    findUser(user) {
        return users.find(e => e.email === user.email)

    },

    //valida si existe el usuario y devuelvo algo, según corresponda
    validateUser(user) {
        users = this.readFile()
        const findUser = this.findUser(user)
        if (findUser === undefined) {
            return 'El usuario no existe'
        } else if (findUser.password == user.password) {
            return 'Acceso concedido'
        } else {
            return 'El usuario o la contraseña son incorrectos'
        }

    }

}


