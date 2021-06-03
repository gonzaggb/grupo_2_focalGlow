const fs = require('fs')
const path = require('path')

//Determino la ruta y el nombre del archivo a leer
const filename = path.resolve(__dirname, '../data/product.json')

//Leo el archivo product en formato JSON
let productsJson = fs.readFileSync(filename, 'utf-8')

//Paso el JSON a objeto literal
let products = JSON.parse(productsJson)

module.exports = {
  create(i) {
    products.push(i)
    productsJson = JSON.stringify(products)
    return fs.writeFileSync(filename, productsJson)
  },
  findAll() {
    return products
  },
  findByPk(id) {
    return products.find((e) => e.id == id)
  },
}
