const { Category } = require('../../database/models')

const controller = {
    list: async (req, res) => {
        let categoryes = await Category.findAll()
        let response = {
            count: {
                total: categoryes.length
            },
            users: categoryes
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
    }
}

module.exports = controller
