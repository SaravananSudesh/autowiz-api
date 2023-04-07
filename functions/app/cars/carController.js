const admin = require("firebase-admin")
const DB = require("../../config/config")

//Get all car details
const getCars = async(req,res) => {

    try {
        
        const snapshot = await DB.Cars.get()
        
        const list = snapshot.docs.map((doc) => ({ id:doc.id, ...doc.data() }))

        res.json(list)

    } catch (error) {
        res.status(403).send(
            res.json({
                "message" : "Cannot get cars!"
            })
        )
    }

}

//Get single car details
const getCar  = async(req,res) => {

    try {
        
        const id = req.params.id
        const snapshot = await DB.Cars.doc(id).get()
        if(!snapshot.data()) throw "Cannot get car!"
        else{
            const car = { id:id, ...snapshot.data() }
            res.send(car)
        }

    } catch (error) {
        res.status(403).send(
            res.json({
                "message" : error
            })
        )
    }
    
}

//Add Car
const addCar = async(req,res) => {

    try {

        if (req.body.password !== "admin@123") throw "Wrong Password!"
        
        const car = req.body

        await DB.Cars.add(car);

        res.json({
            "message" : "Car added successfully!"
        })

    } catch (error) {
        res.status(403).send(error.message);
    }

}

module.exports = { getCars, getCar, addCar }
