const { usersPath } = require('../models/user')
const user = require('../models/user')

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
    let { nombre, apellido, email, password } = req.body
    let newUser = {
      nombre,
      apellido,
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
    const { nombre, apellido, email, password } = req.body
    const { id } = req.params
    const userUpdate = {
      nombre,
      apellido,
      email,
      password
    }
    user.update(userUpdate, id)
    res.redirect("/users")
  }
}

module.exports = controller
