const controller = {
  login: (req, res) => {
    res.render('users/login.ejs')
  },
  newUser: (req, res) => {
    res.render('users/registro.ejs')
  },
}

module.exports = controller
