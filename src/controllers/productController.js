const controlador = {
    detail: (req,res) => {
        res.render('product-detail.ejs')
    },
    add: (req, res) => {
    res.render('product-org.ejs')
    }    
}


module.exports = controlador;
