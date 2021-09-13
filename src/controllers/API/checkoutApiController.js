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
                group: ['product_name'],
                //select productName, sum(quantity) as soldQuantity
                attributes: [['product_name', 'Producto'], ['product_image', 'Imagen'], [sequelize.fn('sum', sequelize.col('quantity')), 'Cantidad']],
                where: { orderId: { [Op.not]: null } },
                include: [{ association: 'order' },

                ],
                order: [[sequelize.fn('sum', sequelize.col('quantity')), order]],
                limit: limit

            })
            let checkoutToShow = checkout.map(element => {                
                element.setDataValue('fecha', element.order.dataValues.Fecha)
                console.log(element)
                const show = {
                    Producto: element.dataValues.Producto,
                    Imagen: element.dataValues.Imagen,
                    Cantidad: element.dataValues.Cantidad
                }
                return show   
                
            })




            let response = {
                meta: {
                    order: order,
                    status: 200,
                    soldProducts: checkout.length,
                    headers: ['Producto', 'Imagen', 'Cantidad'] 

                },
                data: checkoutToShow
            }
            res.json(response)
        } catch (error) {
            console.log(error)
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
                attributes: [['product_name', 'Producto'], ['product_image', 'Imagen']],
                include: [{ association: 'order', attributes: [['created_at', 'Fecha']] }],
                order: [['order', 'created_at', order]],
                limit: limit
            })
            let checkoutToShow = checkout.map(element => {                
                element.setDataValue('fecha', element.order.dataValues.Fecha)
                console.log(element.Product)
                const show = {
                    Producto: element.dataValues.Producto,
                    Imagen: element.dataValues.Imagen,
                    Fecha: element.dataValues.fecha
                }
                return show   
                
            })



            let response = {
                meta: {
                        order: order,
                        status: 200,
                        soldProducts: checkout.length,
                        headers: ['Producto', 'Imagen', 'Fecha'] 
                },
                data: checkoutToShow
            }
            res.json(response)

        } catch (error) {
            console.log(error)
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
