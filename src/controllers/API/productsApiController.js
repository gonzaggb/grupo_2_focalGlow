const { name } = require('ejs')
const { Product, Category } = require('../../database/models')


const controller = {
    list: async (req, res) => {
        let products = await Product.findAll()
        let response = {
            meta: {
                status: 200,
                total: products.length,
                url: 'api/products'

            },
            data: products

        }
        res.json(response)
    },
    detail: async (req, res) => {
        let id = req.params.id
        let product = await Product.findByPk(id, {
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
                url: 'api/products/' + id
            },
            data: product
        }
        res.json(response)
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
            res.json(response)
        }

    },
    pagination: async (req, res) => {
        let allProducts = await Product.findAll()
        let pageQty = Math.ceil(allProducts.length / 10)
        let page = Number(req.params.page)
        let products = await Product.findAll({
            limit: 10,
            offset: page >= 1 ? (page -1) * 10 : 0
        })
        if (page > 0 && page <= pageQty ) {
            let response = {
                meta: {
                    total: products.length,
                    url: `api/products/page/${page}`,
                    next: page < pageQty ? `http://localhost:3000/api/products/page/${page+1}` : null,
                    previous: page > 1 ? `http://localhost:3000/api/products/page/${page-1}` : null,

                },
                data: products

            }
            res.json(response)
        } else {
            let response = {
                meta: {
                    url: `api/products/page/${page}`,
                    status: 204,

                },
            }
            res.json(response)
        }
    }

}

module.exports = controller

