const fs = require('fs')
const path = require('path')

module.exports = {
  //Determino la ruta y el nombre del archivo a leer
  filename: path.resolve(__dirname, '../data/product.json'),

  read() {
    //Leo el archivo product en formato JSON
    let productsJson = fs.readFileSync(this.filename, 'utf-8')
    //Paso el JSON a objeto literal
    let products = JSON.parse(productsJson)
    return products
  },

  writeFile(newData) {
    productsJson = JSON.stringify(newData)
    return fs.writeFileSync(this.filename, productsJson)
  },

  create(i) {
    let products = this.read()
    products.push(i)
    return this.writeFile(products)
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
    return this.writeFile(products)
  },
}
