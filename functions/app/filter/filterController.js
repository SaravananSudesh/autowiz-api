const admin = require("firebase-admin")
const DB = require("../../config/config")

const filterCars = async(req,res) => {

    try {
        
        const snapshot = await DB.Cars.get()

        const request = {
            size : req.body.size,
            body : req.body.body,
            transmission : req.body.transmission,
            fuel : req.body.fuel,
            preference : req.body.preference
        }
        
        var list = snapshot.docs.map((doc) => ({ id:doc.id, ...doc.data() }))

        //Filter based on size
        list = list.filter(obj=> obj.size == request.size)

        //Filter based on body type
        list = list.filter(obj=> obj.body == request.body)

        //Filter based on transmission type
        switch(request.transmission){
            case "Automatic" :
                list = list.filter(obj=> obj.transmission.isAutomatic == true)
                break
            case "Mannual" :
                list = list.filter(obj=> obj.transmission.isMannual == true)
                break
            case "Clutchless" :
                list = list.filter(obj=> obj.transmission.isClutchless == true)
                break
        }

        //Filter based on fuel
        switch(request.fuel){
            case "Diesel" :
                list = list.filter(obj=> obj.fuel.isDiesel == true)
                break
            case "Petrol" :
                list = list.filter(obj=> obj.fuel.isPetrol == true)
                break
            case "Hybrid" :
                list = list.filter(obj=> obj.fuel.isHybrid == true)
                break
            case "EV" :
                list = list.filter(obj=> obj.fuel.isEV == true)
                break
            case "CNG" :
                list = list.filter(obj=> obj.fuel.isCNG == true)
                break
        }

        //Filter based on preference
        list = list.filter(obj=> obj.preference == request.preference)

        res.json(list)

    } catch (error) {
        res.status(403).send(
            res.json({
                "message" : "Cannot get cars!"
            })
        )
    }

}

module.exports = { filterCars }