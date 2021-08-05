const session = require('express-session')
const {Product} = require('../database/models')

const controller = {
    add: async function (req,res){
        const product = await Product.findByPk(req.body.id)
        const {cct , dim, optic, power}= req.body
        const productImage = await product.getImages()
        let mainImage = ''
        productImage.forEach(e => {
            if(e.type == 'main'){
                 mainImage = e.name
               
            }
        });
        const productPrice = Number(product.price) //FIXME actualmente toma el precio del produco, tenemos que hacer que el precio se 
        //actualice en el front en base a las diferentes features y mandarlo por el body
         
        const quantity = Number(req.body.quantity)
        const item = {
            productName: product.name,
            productPrice,
            productDescription: product.description,
            productFeatures:[cct , dim , optic , power],
            productImage: mainImage,
            quantity,
            subTotal: quantity * productPrice,
            userId: req.session.id,
        }
        
    }

}

module.exports = controller