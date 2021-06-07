const categories = require('../models/category')
const products = require('../models/product')

const controller = {
  category: (req, res) => {
    const id = req.params.id
    let category = categories.findByPk(id)
    let product = products.filterByCategory (category.name)
    let dataCategory = {category , product}
    console.log (dataCategory.product.length)
    res.render('category.ejs', { dataCategory } )
  },

}

module.exports = controller
