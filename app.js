const express = require('express') // trae el modulo de express para poder montar el servidor
const path = require('path')
const app = express()
publicPath = path.join(__dirname,'public') // indica que la ruta contiene recursos estaticos para consumir de manera sencilla
console.log(publicPath)

app.use(express.static(publicPath));

app.listen(3000,()=>console.log('Servidor corriendo '))

app.get('/',(req,res) => {
    
    res.sendFile(path.resolve(__dirname,'./views/home.html'))
})

app.get('/us', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/us.html'))
})

app.get('/login', (req, res) => {

    res.sendFile(path.resolve(__dirname, './views/login.html'))
})
