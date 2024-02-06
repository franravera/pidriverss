const { Router } = require("express");
const {teamrouterr} = require('../routes/teamsroute')
const driversrout = require('./driversrout')


const routerr = Router();


routerr.use('/teams', teamrouterr)

routerr.use('/',driversrout)

routerr.use('/:idDriver', driversrout)

// routerr.use('/drivers/:name', driversrout)



// routerr.get("/drivers", (req, res) => {
//     res.json({ message: "¡Hola, esta es una ruta de ejemplo!" });
//   });

module.exports = routerr;
