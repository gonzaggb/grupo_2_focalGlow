
const { Product, Feature, Category } = require('../../database/models')


const controller = {
    list: async (req, res) => {
        let categories = await Category.findAll()
        let response = {
            count: {
                total: categories.length
            },
            data: categories
        }
        res.json(response)
    },
    detail: async (req, res) => {
        let categoryToFind = req.params.id
        let category = await Category.findByPk(categoryToFind)
        let response = {
            meta: {
                status: 200,
                url: 'api/category/' + categoryToFind
            },
            data: category

        }
        res.json(response)
    },
    listAndQty: async (req, res) => {
        let category = await Category.findAll({
            attributes: ['id']
        })
        let product = await category.forEach((e, index) => {
            Product.findOne({
                where: {
                    category_id: category[index].id
                }
            })
        });

        
        
        res.json(product)
    },
    features: async (req, res) => {
        let feature = req.params.feature
        let allFeatures = await Feature.findAll({
            /* where: {
                type : feature
            } */
        })
        
        let response = {
            meta: {
                status: 200,
                message: 'all features',
                url: 'api/products/features'
            },
            data: allFeatures
        }
        res.json(response)
    }

}

module.exports = controller
