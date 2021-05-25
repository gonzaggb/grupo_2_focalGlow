const express = require('express') // trae el modulo de express para poder montar el servidor
const path = require('path') //requiere el modulo nativo path de node
const app = express()
const port = process.env.PORT || 3000

// Requiriendo todos los routers
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

app.use("/",main)
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

/*--------REEMPLAZO POR VERSION EJS--------*/









/*linea de prueba*/

