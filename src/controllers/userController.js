const user = require('../models/user')
const { validationResult } = require('express-validator')
const { isFileImage } = require('../helpers/files')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const usersModel = require('../models/user')


const controller = {
  //envia al usuario a la pagina de login
  login: (req, res) => {

    res.render('users/login.ejs')

  },
  //captura los datos de inicio de sesion al modelo y valida si el usuario puede o no acceder
  loginUser: (req, res) => {
    const formValidation = validationResult(req)
    const oldValues = req.body

    if (!formValidation.isEmpty()) {
      return res.render('users/login', { oldValues, errors: formValidation.mapped() })
    }
    const { email, remember } = req.body
    const user = usersModel.findByField('email', email)
    req.session.logged = user.id
    if (remember) {
      res.cookie('userId', user.id, { maxAge: 6000000, signed: true })
    }
    console.log(user)

    //EVALUA EL TIPO DE USUARIO Y EN CASO DE SER ADMIN LO ENVIA A LISTADO DE PRODUCTO, CASO CONTRARIO A PERFIL
    if (user.category == 'admin') {
      res.redirect('/product')
    } else {
      res.redirect('/users/profile')
    }

  },
  //envia al usuario a la pagina de registro
  newUser: (req, res) => {
    res.render('users/registro.ejs')
  },

  //captura y envia los datos enviados por post al modelo
  create: (req, res) => {
    const validationStatus = validationResult(req) // trae los resultados del middleware
    if (validationStatus.errors.length > 0) {
      if (!req.file) { //valido que exista un archivo, en caso de no existir retorno los errores
        return res.render('users/registro.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      } else {
        if (isFileImage(req.file.originalname)) { // si existe el archivo, valido la extension, si está dentro de las validas lo elimino del servidor, caso contrario no porque evite se guarde con el multer
          fs.unlinkSync(req.file.path)
        }
        return res.render('users/registro.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      }
    }
    let { first_name, last_name, email, password } = req.body
    let newUser = {
      first_name,
      last_name,
      email,
      password: bcrypt.hashSync(password, 10),
      profileImg: '/img/profile-pictures/' + req.file.filename,
      address,
      phone,
      category: 'normal'
    }

    user.create(newUser)
    res.redirect('/')
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

  editProfile: (req, res) => {
    const id = res.locals.user.id
    const userToEdit = user.findByPk(id)
    res.render('users/user-edit.ejs', { userToEdit })
  },




  update: (req, res) => {

    const { first_name, last_name, email, password } = req.body
    const { id } = req.params
    const { file } = req
    const { profileImg } = user.findByPk(id)
    const userUpdate = {
      first_name,
      last_name,
      email,
      password,
      address,
      phone
    }
    if (!file) {
      userUpdate.profileImg = profileImg
    } else {
      userUpdate.profileImg = '/img/profile-pictures/' + file.filename
    }

    user.update(userUpdate, id)
    res.redirect("/users")
  },
  profile: (req, res) => {
    const id = res.locals.user.id
    const userToView = user.findByPk(id)
    res.render('users/profile.ejs', { userToView })
  },

  profileId: (req, res) => {
    const id = req.params.id
    const userToView = user.findByPk(id)
    res.render('users/profile.ejs', { userToView })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie('userId')
    res.redirect('/')
  }

}

module.exports = controller
