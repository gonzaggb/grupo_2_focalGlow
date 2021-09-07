const { Item } = require('../../database/models')
const { Order } = require('../../database/models')

const { Op } = require('sequelize')
const sequelize = require('sequelize')


const controller = {
    listBySold: async (req, res) => {
        const sortType = req.params.sortType
        const limit = Number(req.params.limit) || null

        let order = ''
        //1 ORDENA DE MAYOR A MENOR || cualquier otro valor de MAYOR A MENOR
        sortType == 1 ? order = 'DESC' : order = 'ASC'
        try {
            let checkout = await Item.findAll({
                group: ['productName'],
                //select productName, sum(quantity) as soldQuantity
                attributes: ['productName', [sequelize.fn('sum', sequelize.col('quantity')), 'soldQuantity']],
                where: { orderId: { [Op.not]: null } },
                include: [{ association: 'order' }],
                order: [[sequelize.fn('sum', sequelize.col('quantity')), order]],
                limit: limit

            })
            let response = {
                meta: {
                    order: order,
                    status: 200,
                    soldProducts: checkout.length
                },
                data: checkout
            }
            res.json(response)
        } catch (error) {
            let response = {
                meta: {
                    status: 500,
                    msg: 'Ha ocurrido un error'
                }
            }
            res.json(response)
        }

    },

    listByDate: async (req, res) => {
        const sortType = req.params.sortType
        const limit = Number(req.params.limit) || null
        let order = ''
        //1 ORDENA DE MAYOR A MENOR || cualquier otro valor de MAYOR A MENOR
        sortType == 1 ? order = 'DESC' : order = 'ASC'
        try {
            let checkout = await Item.findAll({
                where: {
                    orderId: { [Op.not]: null }
                },
                include: [{ association: 'order' }],
                order: [['order', 'createdAt', order]],
                limit: limit
            })
            let response = {
                meta: {
                    meta: {
                        order: order,
                        status: 200,
                        soldProducts: checkout.length
                    }
                },
                data: checkout
            }
            res.json(response)

        } catch (error) {
            let response = {
                meta: {
                    status: 500,
                    msg: 'Ha ocurrido un error'
                }
            }
            res.json(response)
        }
    }


}

module.exports = controller
