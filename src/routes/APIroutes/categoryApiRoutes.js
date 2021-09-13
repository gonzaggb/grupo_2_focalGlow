const express = require('express');
const router = express.Router();
const categoriesApiController = require('../../controllers/API/categoriesApiController')

//ruta para traer todos los usuarios

router.get('/', categoriesApiController.list)
router.get('/category/qty', categoriesApiController.listAndQty)
router.get('/:id', categoriesApiController.detail)
router.get('/features/all', categoriesApiController.features)


module.exports = router