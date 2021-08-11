const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/API/usersApiController')

//ruta para traer todos los usuarios
router.get('/', usersApiController.list)
router.get('/:id', usersApiController.detail)

module.exports = router
