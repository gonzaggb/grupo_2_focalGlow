  const express = require('express') // trae el modulo de express para poder montar el servidor
const app = express() //declaramos la variable app que va utilizar todos los metodos de express.
const categoriesMiddleware = require('./middleware/categoriesList')
// Coonfiguracion de la ruta que contiene los recursos estaticos para consumir de manera sencilla
const path = require('path') //requiere el modulo nativo path de node
publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

//requerimos y usamos express-session
const session = require('express-session')
app.use(session({
  secret: 'shhhhh',
  resave: true,
  saveUninitialized: true
}))

//requerimos  e implementamos  cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser('secreto'))
// requerimos e implementamos cookiesessionMiddleware
const cookieSession = require('./middleware/cookieSessionMiddleware')
app.use(cookieSession)
//implementamos middleware de sessionToLocal
const sessionToLocal = require('./middleware/sessionToLocal')
app.use(sessionToLocal)



/*Configuracion del template engine*/
app.set('views', path.join(__dirname, 'views')) // indica al template engine donde buscar las vistas//
app.set('view engine', 'ejs')

//Configuracion de express para poder trabajar con los datos que se envian desde el formulario//
app.use(express.urlencoded({ extended: false })) // sin esta linea no vienen los datos del body que se mandan de los formularios
app.use(express.json())

//Requerimos y usamos el metodo Override para soportar los metodos PUT y DELETE en HTML//
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

//Levantamos el Servidor
const port = process.env.PORT || 3000 // use port 3000 unless there exists a preconfigured port (e.g. Heroku)//
app.listen(port, () =>
  console.log('Servidor corriendo en el puerto ' + port + '\n' + 'Focal Glow es el mejor grupo!!!')
)


// Requiriendo todos los routers
app.use(categoriesMiddleware)
const mainRoutes = require('./routes/mainRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/usersRoutes')
const checkoutRoutes = require('./routes/checkoutRoutes')

//Rutas
app.use('/', mainRoutes)
app.use('/product', productRoutes)
app.use('/category', categoryRoutes)
app.use('/users', userRoutes)
app.use('/checkout' ,checkoutRoutes)

//requerimos las Api routes
const usersApiroutes = require('./routes/APIroutes/usersApiRoutes')
const productsApiroutes = require('./routes/APIroutes/productsApiRoutes')
//Api routes
app.use('/api/users',usersApiroutes)
app.use('/api/products', productsApiroutes)

//Ruta 500 por si falla la base de datos
app.use('/500', (req, res, next) => {
  res.status(500).render('500.ejs')
})
// Ruta 404
app.use((req, res, next) => {
  res.status(404).render('404.ejs')
})
