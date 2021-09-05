const { name } = require('ejs')
const { Product, Category } = require('../../database/models')


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
                products: products
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
                }            }
            res.json(response)
        }


    },
    lastProduct: async (req, res) => {
        let products = await Product.findAll()
        let last = products[products.length - 1]
        let productToShow = await Product.findByPk(last.id,
            {
                include: [
                    { association: 'images' },
                    { association: 'features' },
                    { association: 'files' },
                    { association: 'category' }
                ]
            })
        let response = {
            meta: {
                status: 200,
                id: last.id,
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

    }


}

module.exports = controller

