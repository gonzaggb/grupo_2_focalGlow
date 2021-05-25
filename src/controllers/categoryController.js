const path = require('path')
const viewsPath = path.resolve(__dirname, '../views/');



const controlador = {
    category: (req,res) => {
        let categoryName = req.params.id;
        res.render(path.resolve(viewsPath, 'category.ejs'))
    }
}


module.exports = controlador;