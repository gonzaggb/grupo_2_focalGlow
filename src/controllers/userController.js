const user = require('../models/user')
const controller = {
  login: (req, res) => {
    const userStatus = ''
    res.render('users/login.ejs', { userStatus })

  },
  newUser: (req, res) => {
    res.render('users/registro.ejs')
  },
  create: (req, res) => {
    let newUser = req.body
    user.createUser(newUser)
    res.redirect('/')
  },
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
