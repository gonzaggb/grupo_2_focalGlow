//Requerimos express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();

//Requerimos el controller
const categoriesApiController = require('../../controllers/API/categoriesApiController');

//Asignamos las rutaas

router.get('/', categoriesApiController.list)
router.get('/category/qty', categoriesApiController.listAndQty)
router.get('/:id', categoriesApiController.detail)
router.get('/features/all', categoriesApiController.features)

module.exports = router