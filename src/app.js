const express = require('express') // trae el modulo de express para poder montar el servidor
const app = express()
const path = require('path') //requiere el modulo nativo path de node
const port = process.env.PORT || 3000

// Indica a express la ruta que contiene los recursos estaticos  para consumir de manera sencilla
publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

/*Configuracion del template engine*/
app.set('views', path.join(__dirname, 'views')) // indica al template engine donde buscar las vistas//
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Levantamos el Servidor
app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port))

// Requiriendo todos los routers
const mainRoutes = require('./routes/mainRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/usersRoutes')

//Rutas
app.use('/', mainRoutes)
app.use('/product', productRoutes)
app.use('/categorias', categoryRoutes)
app.use('/users', userRoutes)
