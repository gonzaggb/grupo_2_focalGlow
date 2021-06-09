const categories = require('../models/category')
const products = require('../models/product')

const controller = {
  category: (req, res) => {
    const name = req.params.id
    let category = categories.findByName(name)
    let product = products.filterByCategory(category.name)

    let dataCategory = { category, product }

    res.render('category.ejs', { dataCategory })
  },
}

module.exports = controller
