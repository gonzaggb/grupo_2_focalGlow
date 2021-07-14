const user = require('../models/user')
const { validationResult } = require('express-validator')
const { isFileImage } = require('../helpers/files')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')
const { User } = require('../database/models')



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
    User.findOne(
      {
        where:
          { email }
      })
      .then((user) => {
        //FIXME AGREGAR UN CONSOLE.LOG DE USER (revisar)
        console.log(user)
        req.session.logged = user.id
        if (remember) {
          res.cookie('userId', user.id, { maxAge: 6000000, signed: true })
        }

        
        //EVALUA EL TIPO DE USUARIO Y EN CASO DE SER ADMIN LO ENVIA A LISTADO DE PRODUCTO, CASO CONTRARIO A PERFIL
        if (user.role == 'admin') {
          res.redirect('/product')
        } else {
          res.redirect('/')
        }

      })


  },
  //envia al usuario a la pagina de registro
  newUser: (req, res) => {
    res.render('users/register.ejs')
  },

  //captura y envia los datos enviados por post al modelo

  create: (req, res) => {
    const validationStatus = validationResult(req) // trae los resultados del middleware
    if (validationStatus.errors.length > 0) {
      if (!req.file) { //valido que exista un archivo, en caso de no existir retorno los errores
        return res.render('users/register.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      } else {
        if (isFileImage(req.file.originalname)) { // si existe el archivo, valido la extension, si está dentro de las validas lo elimino del servidor, caso contrario no porque evite se guarde con el multer
          fs.unlinkSync(req.file.path)
        }
        return res.render('users/register.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      }
    }
    let { firstName, lastName, email, password, address, phone } = req.body
    //FIXME VER DONDE SE USABA LA RUTA DE LA IMAGEN PARA ARREGLARLO
    let newUser = {
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      profileImg: req.file ? req.file.filename : 'profile.jpg',
      address,
      phone,
      role: 'user'
    }

    User.create(newUser)
      .then(() => {
        res.redirect('/users/login')
      })

  },


  list: (req, res) => {
    User.findAll()
      .then((userList) => {
        res.render('users/usersList.ejs', { userList })
      })

  },
  //FIXME USER DESTROY ( revisar)
  delete: (req, res) => {
    const id = req.params.id
    User.destroy({
      where : {id}
    })
      .then(()=>{
        res.redirect('/users')
      })
    
  },
  //FIXME USER (revisar)
  edit: (req, res) => {
    const id = req.params.id
    User.findByPk(id)
      .then ((userToEdit) =>{
        res.render('users/user-edit.ejs', { userToEdit })
      })
    
  },
  //FIXME USER UPDATE
  update: (req, res) => {
    const { id } = req.params
    const userToEdit = user.findByPk(id);
    const validationStatus = validationResult(req) // trae los resultados del middleware

    if (!validationStatus.isEmpty()) {
      //Si hay errores que pasa

      return res.render('users/user-edit.ejs', { errors: validationStatus.mapped(), oldData: req.body, userToEdit }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
    }
    //MARS: Tuve que modificar const por let al redefinirle password si el usuario no quiere modificarlo
    let { first_name, last_name, email, password, phone, address, category } = req.body
    const { file } = req
    const { profileImg } = user.findByPk(id)
    //Si el usuario no lleno el campo password que me tome la anterior, sino que hashee la nueva contraseña
    password == '' ? password = user.findByPk(id).password : password = bcrypt.hashSync(password, 10)

    const userUpdate = {
      first_name,
      last_name,
      email,
      password,
      phone,
      address,
      category
    }
    if (!file) {
      userUpdate.profileImg = profileImg
    } else {
      userUpdate.profileImg = '/img/profile-pictures/' + file.filename
    }

    user.update(userUpdate, id)

    res.redirect('/users')
  },

  //FIXME USER (revisar)
  profile: (req, res) => {
    const id = req.params.id
    User.findByPk(id)
      .then ((userToView)=>{
         res.render('users/profile.ejs', { userToView })
      })
   
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie('userId')
    res.redirect('/')
  }

}

module.exports = controller
