const express = require('express');
const router = express.Router();
const checkoutApiController = require('../../controllers/API/checkoutApiController')

//ruta para traer todos los usuarios
router.get('/listBySold/:sortType', checkoutApiController.listBySold)
router.get('/listByDate/:sortType', checkoutApiController.listByDate)
router.get('/listBySold/:sortType/limit/:limit', checkoutApiController.listBySold)
router.get('/listByDate/:sortType/limit/:limit', checkoutApiController.listByDate)




module.exports = router