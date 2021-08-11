const express = require('express');
const router = express.Router();
const productsApiController = require('../../controllers/API/productsApiController')

//ruta para traer todos los usuarios
router.get('/', productsApiController.list)
router.get('/:id', productsApiController.detail)

module.exports = router