const fs = require('fs')
const path = require('path')

module.exports = {
  //determino la ruta donde esta el archivo que quiero leer
  filename: path.resolve(__dirname, '../data/category.json'),

  readFile() {
    //leo la info el metodo readFileSync
    const categoriesJson = fs.readFileSync(this.filename, 'utf-8')
    //parseo el json a JS
    const categories = JSON.parse(categoriesJson)
    //retorno las categorias
    return categories
  },

  writeFile(data) {
    let dataJson = JSON.stringify(data, null, 2)
    fs.writeFileSync(this.filename, dataJson);
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
    return categories.find((e) => e.name == name)
  },

  delete(id) {
    const categories = this.readFile()
    const categoriesUpdate = categories.filter(e => e.id != id)
    this.writeFile(categoriesUpdate)
    return categoriesUpdate

  },

}

