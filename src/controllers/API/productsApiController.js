const { Product } = require('../../database/models')

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
    lastProduct: async (req,res)=>{
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

            totalProducts
        }
        res.json(response)
    }

}

module.exports = controller