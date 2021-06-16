const { usersPath } = require('../models/user')
const user = require('../models/user')
const { validationResult } = require('express-validator')

const controller = {
  //envia al usuario a la pagina de login
  login: (req, res) => {
    const userStatus = ''
    res.render('users/login.ejs', { userStatus })

  },
  //envia al usuario a la pagina de registro
  newUser: (req, res) => {
    res.render('users/registro.ejs')
  },
  //captura y envia los datos enviados por post al modelo
  create: (req, res) => {
    const validationStatus = validationResult(req) // trae los resultados del middleware
    if (validationStatus.errors.length > 0) {
      return res.render('users/registro.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
    }
    console.log(req.file)
    let { name, surname, email, password } = req.body
    let newUser = {
      name,
      surname,
      email,
      password,
      profileImg: '/img/profile-pictures/' + req.file.filename
    }

    user.create(newUser)
    res.redirect('/')
  },
  //captura los datos de inicio de sesion al modelo y valida si el usuario puede o no acceder
  loginUser: (req, res) => {
    const session = req.body
    const userStatus = user.validateUser(session) //valido el usuario
    if (userStatus == 'Acceso concedido') {

      res.redirect('/product/list')
    } else {

      res.render('users/login.ejs', { userStatus })
    }
  },
  list: (req, res) => {
    const userList = user.findAll();
    res.render('users/usersList.ejs', { userList })
  },
  delete: (req, res) => {
    const id = req.params.id
    user.delete(id)
    res.redirect('/users')
  },

  edit: (req, res) => {
    const id = req.params.id
    const userToEdit = user.findByPk(id)
    res.render('users/user-edit.ejs', { userToEdit })
  },
  update: (req, res) => {
    console.log("entro al update del controlador")
    const { name, surname, email, password } = req.body
    const { id } = req.params
    const userUpdate = {
      name,
      surname,
      email,
      password
    }
    user.update(userUpdate, id)
    res.redirect("/users")
  }
}

module.exports = controller
