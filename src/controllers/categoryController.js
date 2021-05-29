/*const express = require('express') // trae el modulo de express para poder montar el servidor
const app = express()*/

/*app.get('/:id', (req, res) => {
  const categoryName = req.params.id
  console.log(categoryName)
})*/

/*const catergoryName = [
  { id: 1, category: 'Plafon' },
  { id: 2, category: 'Apliques' },
]*/

const controller = {
  category: (req, res) => {
    res.render('category.ejs', { categoryName: 'Categoría' })
  },
}

module.exports = controller
