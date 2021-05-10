const express = require('express') // trae el modulo de express para poder montar el servidor
const path = require('path') //requiere el modulo nativo path de node
const app = express() 
publicPath = path.join(__dirname,'public') // indica que la ruta contiene recursos estaticos para consumir de manera sencilla
console.log(publicPath)

app.use(express.static(publicPath));

app.listen(3000,() => console.log('Servidor corriendo en el puerto 3000'))

app.get('/',(req,res) => {
    
    res.sendFile(path.resolve(__dirname,'./views/home.html'))
})

app.get('/us', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/us.html'))
})

app.get('/login', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get('/checkout', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/checkout.html'))
})

app.get('/product', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
})

app.get('/categories', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categories.html'))
})

app.get('/categorias/spot', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/spot.html'))
})

app.get('/categorias/sistema', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/sistema.html'))
})

app.get('/categorias/plafon', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/plafon.html'))
})

app.get('/categorias/pie', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/pie.html'))
})

app.get('/categorias/mesa', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/mesa.html'))
})

app.get('/categorias/exterior', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/exterior.html'))
})

app.get('/categorias/colgante', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/colgante.html'))
})

app.get('/categorias/apliques', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categorias/apliques.html'))
})