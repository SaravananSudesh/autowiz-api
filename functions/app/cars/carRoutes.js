const express = require("express")

const router = express.Router()

const carController = require("./carController")

router.get("/getCars", carController.getCars)
router.get("/getCar/:id", carController.getCar)
router.get("/addCar", carController.addCar)

module.exports = router