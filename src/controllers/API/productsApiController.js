const { name } = require('ejs')
const { Product, Category, Image, Feature, File } = require('../../database/models')
const fs = require('fs')
const path = require('path')
const resourcesPath = path.join(__dirname, '../../../public')
const productImagePath = '/img/'
const productFilePath = '/pdf/'

const controller = {
	list: async (req, res) => {
		let products = await Product.findAll(
			{
				include: [
					{ association: 'images' },
					{ association: 'features' },
					{ association: 'category', attributes: ['name'] }
				],

			})
		let countByCategory = {}

		let categories = await Category.findAll({
			include: [
				{ association: 'products', attributes: ['id'] }
			]
		})

		categories.forEach(category => {
			countByCategory[category.name] = category.products.length

		});


		let url = 'http://localhost:3000/api/products/'
		let productsToShow = products.map(e => {
			e.setDataValue('detail', url + e.id)

			return e
		})
		let response = {
			meta: {
				status: 200,
				total: products.length,
				url: 'api/products'

			},
			data: {
				count: products.length,
				countByCategory,
				products: productsToShow
			}

		}
		res.json(response)
	},
	detail: async (req, res) => {
		let id = req.params.id
		let product = await Product.findByPk(id, {
			include: [
				{ association: 'images', attributes: ['name', 'id', 'type'] },
				{ association: 'features' },
				{ association: 'files' },
				{ association: 'category' }
			]
		})
		let url = 'http://localhost:3000/img/'

		if (product) {
			product.setDataValue('image', url + product.images[0].name)
			let response = {
				meta: {
					status: 200,
					url: 'api/products/' + id
				},
				data: product
			}
			res.json(response)

		} else {
			let response = {
				meta: {
					status: 204,
					detail: `El producto ${id} no existe `
				}
			}
			res.json(response)
		}


	},

	lastProduct: async (req, res) => {
		let products = await Product.findAll()
		let last = products[products.length - 1]
		let productToShow = await Product.findByPk(last.id,
			{
				include: [
					{ association: 'images', attributes: ['id', 'name', 'type'] },
					{ association: 'features', attributes: ['id', 'name', 'type', 'price'] },
					{ association: 'files' },
					{ association: 'category' }
				]
			})
		let response = {
			meta: {
				status: 200,
				url: 'api/products/last'

			},
			data: productToShow

		}
		res.json(response)
	},

	qty: async (req, res) => {
		let products = await Product.findAll()
		let totalProducts = products.length
		let response = {

			data: totalProducts
		}
		res.json(response)
	},

	filterByCategory: async (req, res) => {
		let categoryToFind = req.params.category
		let category = await Category.findOne({
			where: { name: categoryToFind }
		})
		let products = await Product.findAll({
			where: {
				category_id: category.id
			}
		})

		let response = {
			data: { products: products.length }


		}
		res.json(response)

	},

	//FEDE hice esto para llamarlo desde la validacion del nombre
	findByName: async (req, res) => {
		let productToFind = req.params.name
		let product = await Product.findOne({ where: { name: productToFind } });

		if (product !== null) {
			let response = {
				meta: {
					status: 200,
					url: 'api/products/byName/' + product
				},
			}
			console.log(response)
			res.json(response)

		}

	},

	//API by MARS para que desde el dashboard se pueda eliminar un producto
	delete: async (req, res) => {
		let id = req.params.id

		let product = await Product.findByPk(id)

		if (!product) {

			let response = {
				meta: {
					status: 204,
					message: `El producto ${id} no existe`
				}
			}
			return res.json(response)

		}

		try {
			let productToDelete = await Product.findByPk(id)
			let featuresToDelete = await productToDelete.getFeatures()
			let imagesToDelete = await productToDelete.getImages()
			let filesToDelete = await productToDelete.getFiles()


			//borro las relaciones de tablas intermedias
			await productToDelete.removeFeature(featuresToDelete)

			// borra las imagenes asociadas al producto
			await Image.destroy({
				where: { productId: id }
			})
			await File.destroy({
				where: { productId: id }
			})
			// borra el producto
			await Product.destroy(
				{ where: { id } }
			)
			/*ELIMINO TODAS LOS ARCHIVOS ASOCIADOS*/

			// borra todas las imagenes asociadas al producto del servidor
			imagesToDelete.forEach(image => {
				fs.unlinkSync(path.join(resourcesPath, '/img/', image.name))
			})
			// borra todoss los archivos asociados al producto del servidor
			filesToDelete.forEach(file => {
				fs.unlinkSync(path.join(resourcesPath, '/pdf/', file.name))
			})

			let response = {
				meta: {
					status: 200,
					message: 'product deleted',
					url: 'api/products/' + id
				},
				data: product
			}
			res.json(response)



		} catch (error) {

			res.json(error)
		}

	},

	// API para el paginado de productos FEDE
	pagination: async (req, res) => {


		let allProducts = await Product.findAll()
		let page = Number(req.params.page)
		let limit = Number(req.params.limit)
		let pageQty = Math.ceil(allProducts.length / limit)

		console.log(page)
		console.log(limit)

		let products = await Product.findAll({
			limit: limit,
			offset: page >= 1 ? (page - 1) * limit : 0,
			include: [
				{ association: 'images' },
				{ association: 'features' },
				{ association: 'category', attributes: ['name'] }
			],

		})

		if (page > 0 && page <= pageQty) {
			let response = {
				meta: {
					total: products.length,
					url: `api/products/page/${page}`,
					next: page < pageQty ? `http://localhost:3000/api/products/page/${page + 1}` : null,
					previous: page > 1 ? `http://localhost:3000/api/products/page/${page - 1}` : null,

				},
				data: products

			}
			res.json(response)
		} else {
			let response = {
				meta: {
					url: `api/products/page/${page}`,
					status: 204,
					message: 'no content to show'

				},
			}
			res.json(response)
		}
	}

}

module.exports = controller

