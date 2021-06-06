const categories = require('../models/category')

const controller = {
  category: (req, res) => {
    const id = req.params.id
    let category = categories.findByPk(id)
    res.render('category.ejs', { category })
  },
}

module.exports = controller
