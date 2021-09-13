const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/API/usersApiController')

//ruta para traer todos los usuarios
router.get('/', usersApiController.list)
router.get('/email/:email', usersApiController.detailByEmail)
router.get('/qty', usersApiController.qty)
router.get('/last',usersApiController.lastUser)
router.get('/page/:page/limit/:limit', usersApiController.pagination)
router.get('/:id', usersApiController.detail)



module.exports = router
