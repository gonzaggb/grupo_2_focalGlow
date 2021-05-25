const express = require('express') // trae el modulo de express para poder montar el servidor
const path = require('path') //requiere el modulo nativo path de node
const app = express()
const port = process.env.PORT || 3000

const main = require ('./src/routes/main')
const category = require ('./src/routes/category')
const product = require ('./src/routes/product');

publicPath = path.join(__dirname, 'public') // indica que la ruta contiene recursos estaticos para consumir de manera sencilla
console.log(path.resolve(__dirname, './views/home.html'))

app.use(express.static(publicPath));
/*Configuracion del template engine*/
app.set('view engine', 'ejs')
/*---------------------------------*/

app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port))

/* app.get('/', (req, res) => {

    res.render('home')
}) */

/* app.get('/us', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/us.html'))
}) */

//Ruteo de product detail, hay que hacerlo para todos
const productDetailRoute = require ('./src/routes/product')

app.use('/product', product)
app.use('/categorias', category)

/* app.get('/login', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/login.html'))
})

app.get('/registro', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/registro.html'))
})

app.get('/checkout', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/checkout.html'))
}) */

/*--------REEMPLAZO POR VERSION EJS--------*/
app.use("/",main)
/*--------REEMPLAZO POR VERSION EJS--------*/


/*--------REEMPLAZO POR VERSION EJS--------*/

/*app.get('/product', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product-detail.html'))
})*/

/* app.get('/categories', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categories.html'))
})

app.get('/categories2', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/spot', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/sistema', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/plafon', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/pie', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/mesa', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/exterior', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/colgante', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
})

app.get('/categorias/apliques', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/categoria-general.html'))
}) */

/*linea de prueba*/

