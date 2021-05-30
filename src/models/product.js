const fs = require('fs')

const productosJson = JSON.parse(fs.readFileSync(__dirname + '/product.json', 'utf-8'))




module.exports={
    create(i){

        productosJson.products.push(i);
        return fs.writeFileSync(__dirname + '/product.json', JSON.stringify(productosJson))

    } 
}