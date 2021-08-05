const session = require('express-session')
const {Product} = require('../database/models')

const controller = {
    add: async(req,res)=>{
        const product = await Product.findByPk(req.body.id)
        const {cct , dim, optic, power}= req.body
        const productImage = await product.getImages()
        let mainImage = ''
        productImage.forEach(e => {
            if(e.type == 'main'){
                 mainImage = e.name
               
            }
        });
        const item = {
            productName: product.name,
            productPrice: Number(product.price),//FIXME agregar js front para mandar por body
            productDescription: product.description,
            productFeatures:[cct , dim , optic , power],
            productImage: mainImage,
            quantity: Number(req.body.quantity),
            //subTotal: ,//FIXME falta arreglar el tema de la multiplicacion 
           userId: req.session.id,
        }
        
        console.log(item.productPrice * item.quantity)
    }

}

module.exports = controller