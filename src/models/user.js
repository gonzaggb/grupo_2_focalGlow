const fs = require('fs')
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'))

module.exports = {
    createUser(newUser) {
        users.usuarios.push(newUser)
        return fs.writeFileSync(__dirname + '/users.json', JSON.stringify(users))
    },
    validateUser(user) {
        const findUser = users.usuarios.find(e => e.email === user.email)
        if (findUser == undefined) {
            return 'El usuario no existe'
        } else if (findUser.password == user.password) {
            return 'Acceso concedido'
        } else {
            return 'El usuario o la contraseña son incorrectos'
        }

    }

}


