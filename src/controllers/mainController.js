const path = require('path')
const viewsPath = path.resolve(__dirname, '../views/');

const controlador = {
    home: (req,res) => {
        res.render(path.resolve(viewsPath, 'home.ejs'))
    },
    login: (req,res) => {
        res.render(path.resolve(viewsPath, 'login.ejs'))
    },
    registro: (req,res) => {
        res.render(path.resolve(viewsPath, 'registro.ejs'))
    },
    checkout: (req,res) => {
        res.render(path.resolve(viewsPath, 'checkout.ejs'))
    }
}


module.exports = controlador;
