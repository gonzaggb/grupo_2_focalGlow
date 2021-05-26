const controller = {
  detail: (req, res) => {
    res.render('products/product-detail.ejs')
  },
  add: (req, res) => {
    res.render('products/product-org.ejs')
  },
}

module.exports = controller
