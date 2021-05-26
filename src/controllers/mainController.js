const controller = {
  home: (req, res) => {
    res.render('home.ejs')
  },
  checkout: (req, res) => {
    res.render('checkout.ejs')
  },
  us: (req, res) => {
    res.render('us.ejs')
  },
}

module.exports = controller
