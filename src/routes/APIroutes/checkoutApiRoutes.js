//Requerimos express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//Requerimos el controlador
const checkoutApiController = require('../../controllers/API/checkoutApiController')

//Asignamos las rutas
router.get('/listBySold/:sortType', checkoutApiController.listBySold)
router.get('/listByDate/:sortType', checkoutApiController.listByDate)
router.get('/listBySold/:sortType/limit/:limit', checkoutApiController.listBySold)
router.get('/listByDate/:sortType/limit/:limit', checkoutApiController.listByDate)
router.get('/SalesTotal', checkoutApiController.totalSold)

module.exports = router