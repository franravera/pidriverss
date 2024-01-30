const {Router} = require ('express')


const {getAllDrivers,getIdDrivers,createDrivers} = require ('../handlers/driversHandlers')

const driversrout = Router();


driversrout.get("/drivers",getAllDrivers);   

// driversrout.get('/drivers/:name',getNameDrivers);

driversrout.get("/:id",getIdDrivers);

driversrout.post('/drivers',createDrivers); 

 

module.exports = driversrout;