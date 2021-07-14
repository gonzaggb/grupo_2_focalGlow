const categories = require('../models/category')
const products = require('../models/product')


const controller = {
  //FIXME PRODUCT 
  landing: (req, res) => {

    const id = req.params.id
    let category = categories.findByPk(id)
    let product = products.filterByCategory(category.name)
    let dataCategory = { category, product }
    res.render('category.ejs', { dataCategory })
  }
}

module.exports = controller
