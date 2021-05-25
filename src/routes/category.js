//Requiero express y ejecuto la propiedad Router()
const express = require("express");
const router = express.Router();

//requiero el controlador de category
const categoryController = require("../controllers/categoryController");

//Asigno a cada ruta la propiedad del controlador
router.get("/:id", categoryController.category);

const a = "2";

module.exports = router;
