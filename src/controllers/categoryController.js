const categories = require('../models/category')

const controller = {
  category: (req, res) => {
    const name = req.params.id
    let category = categories.findByName(name)
    res.render('category.ejs', { category })
  },
}

module.exports = controller
