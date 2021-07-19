const { validationResult } = require('express-validator')
const { isFileImage } = require('../helpers/files')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { User } = require('../database/models')
const { unsubscribe } = require('../routes/usersRoutes')
const profileImagePath = '/img/profile-pictures/'
const path = require('path')
const { Console } = require('console')

const controller = {
  //envia al usuario a la pagina de login
  login: (req, res) => {

    res.render('users/login.ejs')

  },
  //captura los datos de inicio de sesion al modelo y valida si el usuario puede o no acceder

  loginUser: async (req, res) => {
    const formValidation = validationResult(req)
    const oldValues = req.body

    if (!formValidation.isEmpty()) {
      return res.render('users/login', { oldValues, errors: formValidation.mapped() })
    }
    const { email, remember } = req.body

    const user = await User.findOne(
      {
        where: { email }
      })

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
  },

  //envia al usuario a la pagina de registro
  newUser: (req, res) => {
    res.render('users/register.ejs')
  },

  //captura y envia los datos enviados por post al modelo

  create: async (req, res) => {
    const validationStatus = validationResult(req) // trae los resultados del middleware

    if (!validationStatus.isEmpty()) {

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
    //Solucion BOBA es poner todo en la carpeta img  . El nombre de cada imagen debe empezar por lo que es

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

    await User.create(newUser)

    res.redirect('/users/login')
  },


  list: async (req, res) => {
    try {
      const userList = await User.findAll()
      //FIXME la solución "rapida" fue pasar a la vista la ruta de la imagen de perfil, quizá podemos agregarla como un valor dentro del objeto
      res.render('users/user-list.ejs', { userList, profileImagePath })
    } catch (error) {
      console.log(error)
    }

  },


  //FIXME USER DESTROY ( revisar)
  delete: async (req, res) => {
    const id = req.params.id

    try {
      const userToDelete = await User.findByPk(id)

      if (userToDelete.profileImg != 'profile.jpg') {
        const imageToDelete = path.join(__dirname, '../../public' + profileImagePath + userToDelete.profileImg)
        fs.unlinkSync(imageToDelete)
      }

    } catch (error) {
      console.log(error)
    }

    await User.destroy({
      where: { id }
    })
    res.redirect('/users')
  },

  //FIXME USER (revisar)
  edit: async (req, res) => {
    const id = req.params.id
    const userToEdit = await User.findByPk(id)
    userToEdit.dataValues.profileImg = profileImagePath + userToEdit.profileImg
    res.render('users/user-edit.ejs', { userToEdit })

  },

  //FIXME USER UPDATE
  update: async (req, res) => {
    const { id } = req.params
    const userToEdit = await User.findByPk(id);
    const validationStatus = validationResult(req) // trae los resultados del middleware

    if (!validationStatus.isEmpty()) {
      //Si hay errores que pasa

      return res.render('users/user-edit.ejs', { errors: validationStatus.mapped(), oldData: req.body, userToEdit }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
    }
    //MARS: Tuve que modificar const por let al redefinirle password si el usuario no quiere modificarlo
    let { firstName, lastName, email, password, phone, address, role } = req.body
    const { file } = req


    //Si el usuario no lleno el campo password que me tome la anterior, sino que hashee la nueva contraseña
    password == '' ? password = userToEdit.password : password = bcrypt.hashSync(password, 10)

    const userUpdate = {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
    }

    if (!file) {
      userUpdate.profileImg = userToEdit.profileImg
    } else {
      userUpdate.profileImg = file.filename
    }
    try {
      await User.update(
        userUpdate
        ,
        { where: { id } }
      )
      res.redirect('/users')
    } catch (error) {
      console.log(error)
    }

  },

  //FIXME USER (revisar)
  profile: async (req, res) => {
    const id = req.params.id
    const userToView = await User.findByPk(id)


    //FIXME => modifique la ruta directa por una varible declarada al principio del codigo @gonza
    userToView.dataValues.profileImg = profileImagePath + userToView.dataValues.profileImg


    res.render('users/user-detail.ejs', { userToView })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie('userId')
    res.redirect('/')
  }

}

module.exports = controller
