const session = require('express-session')
const { Product } = require('../database/models')
const { Item } = require('../database/models')
const { Feature } = require('../database/models')
const { User } = require('../database/models')
const { Order } = require('../database/models')
const Op = require('sequelize')
const { checkout } = require('./mainController')


const controller = {
	add: async function (req, res) {
		const product = await Product.findByPk(req.body.id)
		const { cct, dim, optic, power } = req.body
		const productImage = await product.getImages()
		let mainImage = ''
		productImage.forEach(e => {
			if (e.type == 'main') {
				mainImage = e.name

			}
		});
		const productFeatureAux = await Feature.findAll({
			attributes: ['name'],
			where: {
				id: [cct, dim, optic, power]
			},


		})
		let productFeatures2 = []
		productFeatureAux.forEach(e => {
			productFeatures2.push(e.name)
		})
		let productFeatures = {
			CCT: 'CCT: ' + productFeatures2[0],
			DIM: 'DIM: ' + productFeatures2[1],
			OPTIC: 'OPTIC: ' + productFeatures2[2],
			POWER: 'POWER: ' + productFeatures2[3]
		}


		const productPrice = Number(product.price)
		console.log(productPrice)
		//FIXME actualmente toma el precio del produco, tenemos que hacer que el precio se 
		//actualice en el front en base a las diferentes features y mandarlo por el body
		const quantity = Number(req.body.quantity)
		/* const productFeatures = [cct , dim , optic , power].toString() */
		const userId = res.locals.user.id
		const item = {
			productName: product.name,
			productPrice,
			productDescription: product.description,
			productFeatures: JSON.stringify(productFeatures),//aca paso el objeto a string para que lo tome la DB
			productImage: mainImage,
			quantity,
			subTotal: quantity * productPrice,
			userId

		}
		console.log(item.productPrice)

		await Item.create(item)
		res.redirect('/checkout')
	},
	list: async (req, res) => {
		const productCheckout = await Item.findAll({
			where: {
				userId: res.locals.user.id
			}
		})
		const id = res.locals.user.id
		const user = await User.findByPk(id)

		/*  productCheckout.forEach(product => {
				 product.productPrice.dataValues = Number(product.productPrice)
		 })
		 console.log(productCheckout) */
		let features = []
		const featuresaux = productCheckout.forEach(e => {
			features.push(JSON.parse(e.productFeatures))//aca paso a objeto los strings de los features
		})

		//preguntar como hacer para que viaje con el nombre 
		res.render('checkout.ejs', { productCheckout, features, user })
	},
	// validar que el usuario no pueda agregar dos productos iguales en items diferentes
	//tomar el precio de la db y no del front 
	//validar que todo lo que se mande del front corresponda con los que esta en la db 
	destroy: async (req, res) => {
		let { id } = req.params
		const itemToDelete = await Item.findByPk(id)
		itemToDelete.destroy()
		res.redirect('/checkout')
	},
	purchase: async (req, res) => {
		//Crear el objeto ORDER en la tabla ORDER
		//Modificar el objeto ITEM, la parte de ORDER ID, una vez creado ORDER

		const order = {
			total: req.body.total,
			createdAt: Date.now(),
			userId: res.locals.user.id
		}

		const orderCreated = await Order.create(order)

		const itemUpdate = await Item.update(
			{ orderId: orderCreated.id },
			{
				where: {
					userId: orderCreated.userId,
					orderId: null
				}
			}

		)
		res.render('succes-purchase.ejs')

	}



}


module.exports = controller