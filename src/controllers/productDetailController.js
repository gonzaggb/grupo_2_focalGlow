const path = require('path')
const viewsPath = path.resolve(__dirname, '../views/');

const controlador = {
    detail: (req,res) => {
        res.render(path.resolve(viewsPath, 'product-detail.ejs'))
    }
}


module.exports = controlador;
