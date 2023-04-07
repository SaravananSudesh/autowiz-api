const express = require("express")

const router = express.Router()

const filterController = require("./filterController")

router.post("", filterController.filterCars)

module.exports = router