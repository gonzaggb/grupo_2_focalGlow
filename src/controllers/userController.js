const controlador={
    login: (req, res) => {
        res.render('login.ejs')
    },
    newUser: (req, res) => {
    res.render( 'registro.ejs')
    },

    
}

module.exports=controlador