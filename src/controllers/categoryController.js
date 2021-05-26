const controlador = {
    category: (req,res) => {
        let categoryName = req.params.id;
        res.render('category.ejs')
    }
}


module.exports = controlador;