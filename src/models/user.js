const fs = require('fs')
const path = require('path')



module.exports = {
    //resuelve la ruta de los datos
    usersPath: path.resolve(__dirname, '../data/users.json'),

    //lee el archivo
    readFile() {
        const usersJson = JSON.parse(fs.readFileSync(this.usersPath, 'utf-8'))
        return usersJson
    },
    //escribe los datos nuevos en el archivo
    writeFile(newData) {
        console.log('Ingreso a writeFile')
        console.log('recibo por parametros')
        console.log(newData)
        fs.writeFileSync(this.usersPath, JSON.stringify(newData, null, 2))
        return newData
    },
    //crea el nuevo id
    generateId() {
        console.log('Ingrese a generate ID')
        const newId = this.readFile().pop().id + 1
        return newId
    },
    //crea un nuevo usuario
    create(newUser) {
        newUser.id = this.generateId()
        const userJson = this.readFile()
        const usersUpdated = [...userJson, newUser]
        this.writeFile(usersUpdated)
        return newUser
    },
    findAll() {
        return this.readFile()
    },

    //busca si existe el usuario por mail
    findUser(user) {
        const users = this.readFile()
        return users.find(e => e.email === user.email)

    },
    findByPk(id) {
        const users = this.readFile()
        return users.find(e => e.id == id)
    },
    delete(id){
        const users = this.readFile()
        const usersUpdate = users.filter(e => e.id != id)
        this.writeFile(usersUpdate)
        return usersUpdate
    },

    //valida si existe el usuario y devuelvo algo, según corresponda
    validateUser(user) {
        const findUser = this.findUser(user)
        console.log(findUser)
        if (findUser === undefined) {
            return 'El usuario no existe'
        } else if (findUser.password == user.password) {
            return 'Acceso concedido'
        } else {
            return 'El usuario o la contraseña son incorrectos'
        }
        //validate creo que va a haber que reescribirlo para que devuelva 0 en caso de que no exista el usuario y 1 en caso de que si exista
        //posterior a eso que el registro de usuarios valide si existe el usuario e informe que está y en caso contrario que lo cree.
        //este mismo validate se podria usar para dar acceso al usuario en caso de existir y que la contraseña que escribio coincida
    }
}
