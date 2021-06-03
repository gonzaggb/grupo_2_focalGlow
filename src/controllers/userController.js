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
    let {nombre, apellido, email, password} = req.body
    let newUser={
      nombre,
      apellido,
      email,
      password
    }
    user.create(newUser)
    res.redirect('/')
  },
  //captura los datos de inicio de sesion al modelo y valida si el usuario puede o no acceder
  loginUser: (req,res) =>{
    const session = req.body
    const userStatus = user.validateUser(session) //valido el usuario
    if(userStatus == 'Acceso concedido'){
      console.log(userStatus)
      res.redirect('/product/list')
     }else{
      console.log(userStatus)
    res.render('users/login.ejs', { userStatus })
    }
  }
}

module.exports = controller
