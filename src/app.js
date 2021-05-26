const express = require('express') // trae el modulo de express para poder montar el servidor
const path = require('path') //requiere el modulo nativo path de node
const app = express()
const port = process.env.PORT || 3000

// Requiriendo todos los routers
const mainRoutes = require('./routes/mainRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/usersRoutes')

publicPath = path.join(__dirname, '../public') // indica que la ruta contiene recursos estaticos para consumir de manera sencilla
console.log(path.resolve(__dirname, './views/home.html'))

app.use(express.static(publicPath))

/*Configuracion del template engine*/
app.set('views', path.join(__dirname, 'views'))// indica al template engine donde buscar las vistas//
app.set('view engine', 'ejs')
/*---------------------------------*/

app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port))



app.use('/', mainRoutes)
app.use('/product', productRoutes)
app.use('/categorias', categoryRoutes)
app.use('/users', userRoutes)


