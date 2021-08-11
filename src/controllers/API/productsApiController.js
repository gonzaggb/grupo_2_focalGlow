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
    }

}

module.exports = controller