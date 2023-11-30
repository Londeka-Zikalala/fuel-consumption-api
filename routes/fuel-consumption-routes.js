function fuelConsumptionRoutes(fuelConsumption){
    async function showIndex(req, res, next){
        try{
            let allVehicles = await fuelConsumption.vehicles()
            res.render('index', {
                allVehicles
            })
        }catch(error){
            console.error(error.message)
            next(error)
        }
    }

async function addVehicleRoute(req, res, next){
    try{
        const regNumber = req.body.reg_number
        const description = req.body.description
        console.log(regNumber, description)
       await fuelConsumption.addVehicle({regNumber, description})
        res.render('add')
    }catch(error){
        console.error(error.message)
        next(error)
    }

}

        async function showAdd(req,res,next){
            try{ res.render('add')
        }catch(error){
            console.error(error.message)
            next(error)
    }
        }

    async function showRefuel(req, res, next){
        try{
            res.render('refuel')
        }catch(error){
        console.error(error.message)
        next(error)
    }
    }

    async function getVehicles(req, res, next){
        try{
            let allVehicles = await fuelConsumption.vehicles()
                
            console.log(allVehicles)
            res.render('index', {
                allVehicles
            })
        }catch(error){
            console.error(error.message)
            next(error)
        }
    }

    // async function postVehicles
    async function refuelRoute(req, res,next){
        try{     const vehicleId = req.body.vehicleId;
                 const liters = req.body.liters;
                 const amount = req.body.amount;
                 const distance = req.body.distance
                 const filledUp = true
             let refuel =   await fuelConsumption.refuel(vehicleId, liters, amount, distance, filledUp)
             console.log(refuel)
//redirect to the homepage

            res.redirect('/vehicles')

        }catch(error){
            console.error(error.message)
            next(error)
        }
    }

    return{
        showIndex,
        addVehicleRoute,
        getVehicles,
        refuelRoute,
        showAdd,
        showRefuel
    }
}

export default fuelConsumptionRoutes