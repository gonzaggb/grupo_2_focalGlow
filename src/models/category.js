const { name } = require('ejs')
const fs = require('fs')

const file = fs.readFileSync(__dirname + '/category.json')

// parsea el json
const jsonFile = JSON.parse(file)

module.exports = {
  findAll() {
    return jsonFile.categories
  },

  findByPk(id) {
    return jsonFile.categories.find((e) => e.id == id)
  },
}
