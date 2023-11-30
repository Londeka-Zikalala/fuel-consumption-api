function fuelConsumptionRoutes(fuelConsumption){
    async function showIndex(req, res, next){
        try{
            res.render('index')
        }catch(error){
            console.error(error.message)
            next(error)
        }
    }
async function addVehicles(req, res, next){
    try{
        const regNumber = req.body.reg_number
        const description = req.body.description
       await fuelConsumption.addVehicle({regNumber, description})
        
        res.redirect('/vehicles')
    }catch(error){
        console.error(error.message)
        next(error)
    }

}
    

    async function getVehicles(req, res, next){
        try{
            let allVehicles = await fuelConsumption.vehicles()
            console.log(fuelConsumption)
            res.render('index', {
                allVehicles
            })
        }catch(error){
            console.error(error.message)
            next(error)
        }

    }
    return{
        showIndex,
        addVehicles,
        getVehicles,
    }
}

export default fuelConsumptionRoutes