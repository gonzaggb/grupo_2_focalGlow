const { Category } = require('../../database/models')
const { Product } = require('../../database/models')


const controller = {
    list: async (req, res) => {
        let categoryes = await Category.findAll()
        let response = {
            count: {
                total: categoryes.length
            },
            data: categoryes
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
    }

}

module.exports = controller
