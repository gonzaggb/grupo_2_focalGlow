const { validationResult } = require('express-validator')
const { isFileImage } = require('../helpers/files')
const fs = require('fs')
const bcrypt = require('bcryptjs')
const { User } = require('../database/models')
const profileImagePath = '/img/profile-pictures/'
const path = require('path')

const controller = {
  //envia al usuario a la pagina de login
  login: (req, res) => {

    res.render('users/user-login.ejs')

  },
  //captura los datos de inicio de sesion al modelo y valida si el usuario puede o no acceder

  loginUser: async (req, res) => {
    const formValidation = validationResult(req)
    const oldValues = req.body

    if (!formValidation.isEmpty()) {
      return res.render('users/user-login.ejs', { oldValues, errors: formValidation.mapped() })
    }
    const { email, remember } = req.body

    try {
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
    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
  },

  //envia al usuario a la pagina de registro
  newUser: (req, res) => {
    res.render('users/user-register.ejs')
  },

  //captura y envia los datos enviados por post al modelo

  create: async (req, res) => {
    const validationStatus = validationResult(req) // trae los resultados del middleware

    if (!validationStatus.isEmpty()) {

      if (!req.file) { //valido que exista un archivo, en caso de no existir retorno los errores
        return res.render('users/user-register.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      } else {
        if (isFileImage(req.file.originalname)) { // si existe el archivo, valido la extension, si está dentro de las validas lo elimino del servidor, caso contrario no porque evite se guarde con el multer
          fs.unlinkSync(req.file.path)
        }
        return res.render('users/user-register.ejs', { errors: validationStatus.mapped(), oldData: req.body }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      }
    }

    let { firstName, lastName, email, password, address, phone } = req.body

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
    try {
      await User.create(newUser)

      res.redirect('/users/login')

    } catch (error) {
      console.log(error)

      return res.redirect('/500')
    }
  },


  list: async (req, res) => {
    const offset = req.query.offset
    try {
      const userLength = await User.findAll()
      const userList = await User.findAll({
        limit: 20,
        offset: (typeof (offset) == 'undefined') ? Number(0) : Number(offset),
      })

      userList.forEach(user => {
        user.dataValues.profileImg = profileImagePath + user.profileImg

      });
      const nextButton = parseInt(userLength.length / 10)
      res.render('users/user-list.ejs', { userList, nextButton })

    } catch (error) {
      res.status(400).render('404.ejs')
      console.log(error)

      return res.redirect('/500')
    }

  },


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
      return res.redirect('/500')
    }

    try {
      await User.destroy({
        where: { id }
      })

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }

    res.redirect('/users')
  },


  edit: async (req, res) => {
    const id = req.params.id
    try {
      const userToEdit = await User.findByPk(id)
      userToEdit.dataValues.profileImg = profileImagePath + userToEdit.profileImg
      res.render('users/user-edit.ejs', { userToEdit})

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }

  },

  editPassword: async (req, res) => {
    const { id } = req.params

    try {
      const userToEdit = await User.findByPk(id)
      userToEdit.dataValues.profileImg = profileImagePath + userToEdit.profileImg
      res.render('users/user-edit-password.ejs', { userToEdit })

    } catch (error) {

      console.log(error)
      return res.redirect('/500')
    }
  },


  update: async (req, res) => {
    const { id } = req.params

    try {

      const userToEdit = await User.findByPk(id);

      const validationStatus = validationResult(req) // trae los resultados del middleware

      if (!validationStatus.isEmpty()) {
        //Si hay errores que pasa
        userToEdit.dataValues.profileImg = profileImagePath + userToEdit.profileImg
        return res.render('users/user-edit.ejs', { errors: validationStatus.mapped(), oldData: req.body, userToEdit }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      }


      //MARS: Tuve que modificar const por let al redefinirle password si el usuario no quiere modificarlo
      let { firstName, lastName, email, phone, address } = req.body
      const { file } = req

      console.log(userToEdit.profileImg)
      //MARS: Si el usuario envia una imagen nueva debo borrar la anterior del servidor
      if (file && userToEdit.profileImg != 'profile.jpg') {

        const imageToDelete = path.join(__dirname, '../../public' + profileImagePath + userToEdit.profileImg)
        fs.unlinkSync(imageToDelete)
        console.log(imageToDelete)
      }


      //El password es el anterior. Para modificar el password es otro formulario/otra parte del controlador
      let password = userToEdit.password

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


      await User.update(
        userUpdate
        ,
        { where: { id } }
      )
      res.redirect('/users')

    } catch (error) {

      console.log(error)
      return res.redirect('/500')
    }

  },

  updatePassword: async (req, res) => {
    const { id } = req.params

    try {
      const userToEdit = await User.findByPk(id)
      const validationStatus = validationResult(req) // trae los resultados del middleware

      if (!validationStatus.isEmpty()) {

        //Si hay errores que pasa
        return res.render('users/user-edit-password.ejs', { errors: validationStatus.mapped(), oldData: req.body, userToEdit }) // se mapea para que devuelva como un objeto literal con sus respectivas propiedades
      }
    } catch (error) {

      console.log(error)
      return res.redirect('/500')
    }

    let { password } = req.body

    try {
      await User.update(
        { password: bcrypt.hashSync(password, 10) },
        { where: { id } }
      )
      return res.redirect('/users/login')

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
  },


  profile: async (req, res) => {
    const id = req.params.id

    try {
      const userToView = await User.findByPk(id)
      userToView.dataValues.profileImg = profileImagePath + userToView.profileImg

      res.render('users/user-detail.ejs', { userToView })

    } catch (error) {
      console.log(error)
      return res.redirect('/500')
    }
  },

  logout: (req, res) => {
    req.session.destroy()
    res.clearCookie('userId')
    res.redirect('/')
  }

}

module.exports = controller
