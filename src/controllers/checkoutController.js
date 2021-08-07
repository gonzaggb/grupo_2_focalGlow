const session = require('express-session')
const {Product} = require('../database/models')
const {Item}= require('../database/models')
const {Feature}= require('../database/models')
const Op= require('sequelize')
const { checkout } = require('./mainController')


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
        const productFeatureAux= await Feature.findAll({
            attributes:['name'],
            where: {
                id: [cct, dim, optic, power]
            },
            
            
        })
        let productFeatures2 = []
        productFeatureAux.forEach(e=>{
            productFeatures2.push(e.name)
        })
        let productFeatures = {
            CCT :  'CCT: ' +productFeatures2[0],
            DIM : 'DIM: '+ productFeatures2[1],
            OPTIC : 'OPTIC: '+productFeatures2[2],
            POWER : 'POWER: '+productFeatures2[3]
        } 
        
        
        const productPrice = Number(product.price) //FIXME actualmente toma el precio del produco, tenemos que hacer que el precio se 
        //actualice en el front en base a las diferentes features y mandarlo por el body
        const quantity = Number(req.body.quantity)
        /* const productFeatures = [cct , dim , optic , power].toString() */
        const userId = res.locals.user.id
        const item = {
            productName: product.name,
            productPrice,
            productDescription: product.description,
            productFeatures: JSON.stringify(productFeatures),
            productImage: mainImage,
            quantity,
            subTotal: quantity * productPrice,
            userId

        }
        
        
        await Item.create(item)
        res.redirect('/checkout')
    },
    list: async (req,res)=>{
        const productCheckout = await Item.findAll({
            where:{
                userId: res.locals.user.id
            }

           
        })
        console.log(productCheckout)
        
        let features = [] 
        
        const featuresaux =  productCheckout.forEach(e=>{
           features.push(JSON.parse(e.productFeatures))
        })
         
          
        //preguntar como hacer para que viaje con el nombre 
        res.render('checkout.ejs', {productCheckout, features})
    }
    // validar que el usuario no pueda agregar dos productos iguales en items diferentes
    //tomar el precio de la db y no del front 
    //validar que todo lo que se mande del front corresponda con los que esta en la db 


}

module.exports = controller