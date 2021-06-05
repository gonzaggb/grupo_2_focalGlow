const fs = require('fs')
const path = require('path')
//Determino la ruta y el nombre del archivo a leer
const filename = path.resolve(__dirname, '../data/product.json')

module.exports = {
  read() {
    //Leo el archivo product en formato JSON
    let productsJson = fs.readFileSync(filename, 'utf-8')
    //Paso el JSON a objeto literal
    let products = JSON.parse(productsJson)
    return products
  },

  create(i) {
    let products = this.read()
    products.push(i)
    productsJson = JSON.stringify(products)
    return fs.writeFileSync(filename, productsJson)
  },
  findAll() {
    let products = this.read()
    return products
  },
  findByPk(id) {
    let products = this.read()
    return products.find((e) => e.id == id)
  },
  delete(id) {
    let products = this.read()
    //busco el indice dentro del array products
    let index = products.findIndex((e) => e.id == id)
    //uso el metodo splice para sacar ese producto
    products.splice(index, 1)

    //vuelvo a escribir el archivo
    productsJson = JSON.stringify(products)
    return fs.writeFileSync(filename, productsJson)
  },
}
