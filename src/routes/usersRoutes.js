//Requiero express y ejecuto la propiedad Router()
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/login', userController.login);
router.get('/registro', userController.newUser);

module.exports=router