const {Router} = require ('express')


const {getAllDrivers,getNameDrivers,getIdDrivers,createDrivers} = require ('../handlers/driversHandlers')

const driversrout = Router();


driversrout.get("/drivers",getAllDrivers);

driversrout.get('/drivers/:name',getNameDrivers);

driversrout.get("/drivers/:id",getIdDrivers);

driversrout.post('/drivers',createDrivers); 

 

module.exports = driversrout;