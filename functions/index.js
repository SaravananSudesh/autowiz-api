const functions = require("firebase-functions")

const express = require("express")
const app = express()
const cors = require("cors")

const carRoutes = require("./app/cars/carRoutes")
const filterRoutes = require("./app/filter/filterRoutes")

app.use(express.json())
app.use(cors())

//Routes
app.use('/api/cars', carRoutes)
app.use('/api/filter', filterRoutes)

app.get('/', (req,res)=>{
    res.send('<h1>Autowiz API</h1>');
})

exports.app = functions.https.onRequest(app)