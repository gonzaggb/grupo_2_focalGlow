const fs = require('fs')
const path = require('path')

module.exports = {
  //determino la ruta donde esta el archivo que quiero leer
  filename: path.resolve(__dirname, '../data/category.json'),
  products: path.resolve(__dirname, '../data/product.json'),

  readFile() {
    //leo la info el metodo readFileSync
    const categoriesJson = fs.readFileSync(this.filename, 'utf-8')
    //parseo el json a JS
    const categories = JSON.parse(categoriesJson)
    //retorno las categorias
    return categories
  },
  readFileProduct() {
    //leo la info el metodo readFileSync
    const productsJson = fs.readFileSync(this.products, 'utf-8')
    //parseo el json a JS
    const products = JSON.parse(categoriesJson)
    //retorno las categorias
    return products
  },
  findAll() {
    const categories = this.readFile()
    return categories
  },

  findByPk(id) {
    const categories = this.readFile()
    return categories.find((e) => e.id == id)
  },

  findByName(name) {
    const categories = this.readFile()
    console.log(name)
    return categories.find((e) => e.id == name)
    
  },
  productById (id) {
    const products = this.readFileProduct()
    /* const categories = this.findByPk(id) */
  }
}
