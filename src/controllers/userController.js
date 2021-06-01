const user = require('../models/user')
const controller = {
  login: (req, res) => {
    res.render('users/login.ejs')
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
    let session = req.body
    let userStatus = user.validateUser(session)
    console.log(userStatus)
/*      res.render('users/login.ejs', {'userStatus': userStatus })
 */   }
}

module.exports = controller
