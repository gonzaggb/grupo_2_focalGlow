const session = require('express-session')
const { Product } = require('../database/models')
const { Item } = require('../database/models')
const { Feature } = require('../database/models')
const { User } = require('../database/models')
const { Order } = require('../database/models')
const { Op } = require('sequelize')
const { randomArray2 } = require('../helpers/utilities')
const productImagePath = '/img/'


//FIXME PASAR A HELPERS
//funciones auxiliares para no repetir en el codigo
function addProductImagePath(element) {
	return element.dataValues.name = productImagePath + element.name
}

function isSame(featureCheckoutItem, newItem) {
	let sameProduct = false
	featureCheckoutItem[0] === newItem[0] && featureCheckoutItem[1] === newItem[1]
		&& featureCheckoutItem[2] === newItem[2] && featureCheckoutItem[3] === newItem[3]
		? sameProduct = true : ''
	return sameProduct
}

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
		//ARRAY CON LAS FEATURES QUE VIAJAN EN EL BODY
		const productFeatureAux = await Feature.findAll({
			attributes: ['name', 'price', 'id'],
			where: {
				id: [cct, dim, optic, power]
			},
		})
		let productFeatures2 = []
		let featuresAcumulatedPrice = 0
		productFeatureAux.forEach(e => {
			productFeatures2.push(e.name)
			featuresAcumulatedPrice += Number(e.price) //sumariza el precio de las features del producto elegido por el usuario
		})
		let productFeatures = {
			CCT: 'CCT: ' + productFeatures2[0],
			DIM: 'DIM: ' + productFeatures2[1],
			OPTIC: 'OPTIC: ' + productFeatures2[2],
			POWER: 'POWER: ' + productFeatures2[3]
		}
		const productPrice = Number(product.price)
		//FIXME actualmente toma el precio del producto, tenemos que hacer que el precio se 
		//actualice en el front en base a las diferentes features y mandarlo por el body
		const quantity = Number(req.body.quantity)
		/* const productFeatures = [cct , dim , optic , power].toString() */
		const userId = res.locals.user.id

		//productFeatureAux es un array con las features que tiene el producto que está en el carrito, sino existe es un array vacio
		//userItem busca si existe en el carrito el nuevo producto que se quiere guardar
		const userItem = await Item.findAll({
			where: {
				productId: product.id,
				orderId: null
			}
		})

		/**NO ME GUSTA EL MANEJO QUE HAGO ACÁ CON LOS VAR, PERO NO SE ME OCURRIO OTRA MANERA, DE MOMENTO */

		if (userItem.length > 0) {
			/*Devuelve el item del carrito cuyo producto y features son iguales, en caso de existir, sino un array vacio */
			const itemToUpdate = userItem.filter(item => {
				let features = JSON.parse(item.productFeatures)
				let featureValues = []
				var sameItem = true

				/*Armo un array con las features del item guardado, las mismas vienen como string, 
				y de una forma medio pete, asi que hice este chino */
				featureValues.push(features['CCT'].split(':')[1].trim())
				featureValues.push(features['DIM'].split(':')[1].trim())
				featureValues.push(features['OPTIC'].split(':')[1].trim())
				featureValues.push(features['POWER'].split(':')[1].trim())

				/*productFeatureAux trae las features que viajan del body, las recorre y valida si son las mismas
				que tiene el producto del carrito, que arme previamente*/
				productFeatureAux.forEach((element, index) => {
					element.name != featureValues[index] ? sameItem = false : ''
				})
				let itemId = ''
				return sameItem === true ? itemId = item.id : ''
			})


			if (itemToUpdate.length > 0) {
				await Item.update({
					quantity: Number(itemToUpdate[0].dataValues.quantity) + Number(req.body.quantity),
					subtotal: (productPrice + featuresAcumulatedPrice)

				},
					{
						where: {
							id: itemToUpdate[0].id,
							orderId: null
						}
					})

			} else {
				const newItem = {
					productName: product.name,
					productPrice,
					productDescription: product.description,
					productFeatures: JSON.stringify(productFeatures),//aca paso el objeto a string para que lo tome la DB
					productImage: mainImage,
					quantity,
					subtotal: (productPrice + featuresAcumulatedPrice),
					userId,
					productId: product.id

				}

				await Item.create(newItem)
			}
		} else {

			const newItem = {
				productName: product.name,
				productPrice,
				productDescription: product.description,
				productFeatures: JSON.stringify(productFeatures),//aca paso el objeto a string para que lo tome la DB
				productImage: mainImage,
				quantity,
				subtotal: (productPrice + featuresAcumulatedPrice),
				userId,
				productId: product.id

			}

			await Item.create(newItem)
		}
		res.redirect('/checkout')


	},


	list: async (req, res) => {
		const { cct, dim, optic, power } = req.body

		const productCheckout = await Item.findAll({
			where: {
				userId: res.locals.user.id,
				orderId: null
			}
		})

		//ARMO ARRAY CON LOS ID PRODUCTO QUE ESTAN EN EL CARRITO
		const productsToCheckout = []
		productCheckout.forEach(e => {
			productsToCheckout.push(e.productId)
		})
		const id = res.locals.user.id
		const user = await User.findByPk(id)

		let features = []
		const featuresaux = productCheckout.forEach(e => {
			features.push(JSON.parse(e.productFeatures))//aca paso a objeto los strings de los features
		})

		//ARMO ARRAY CON LAS CATEGORIAS DE LOS PRODUCTOS EN EL CARRITO
		const categories = []
		const products = await Product.findAll()
		productCheckout.forEach(item => {
			let productFound = products.find(product => item.productId == product.id)
			if (productFound) {
				categories.push(productFound.categoryId)
			}
		})
		//FIXME PASAR A HELPERS
		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}
		//ME QUEDO CON LAS CATEGORIAS ÚNICAS
		const uniqueCategorie = categories.filter(onlyUnique)

		//TRAIGO LOS PRODUCTOS CUYA CATEGORIA COINCIDE CON LAS DEL CARRITO CON SUS RESPECTIVAS IMAGENES, EXCLUYO LOS PRODUCTOS DEL CARRITO
		//CONSULTO DOS VECES A LA BASE DE PRODUCTOS, VER COMO OPTIMIZAR ESTO
		let similarProducts = await Product.findAll({
			where: {
				categoryId: uniqueCategorie,
				id: {
					[Op.not]: productsToCheckout
				}
			},
			include: [{
				association: 'images',
				where: {
					type: 'main',

				}
			}]
		})
		//GENERO UN ARRAY DE NUMEROS RANDOM
		const indexArray = randomArray2(similarProducts.length, 3)
		const sliderProducts = []
		//GENERO EL ARRAY DE PRODUCTOS PARA EL SLIDER
		indexArray.forEach(e => {
			sliderProducts.push(similarProducts[e])
		})
		//AGREGO LAS RUTAS A LOS PRODUCTOS
		sliderProducts.forEach(product => {
			product.images.forEach(image => {
				addProductImagePath(image)
			})
		})


		//preguntar como hacer para que viaje con el nombre 
		res.render('checkout.ejs', { productCheckout, features, user, sliderProducts })
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

		const productCheckout = await Item.findAll({
			where: {
				userId: res.locals.user.id,
				orderId: null
			}
		})

		const subTotalCheckout = productCheckout.map(element => {
			return (Number(element.dataValues.subtotal) * Number(element.dataValues.quantity))
		})

		const totalCheckout = subTotalCheckout.reduce((bef, aft) => bef + aft)

		const order = {
			total: totalCheckout,
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
