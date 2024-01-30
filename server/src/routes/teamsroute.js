const {Router} = require ('express')

const {getAllTeams} = require ('../handlers/teamshandlers')

const teamrouterr = Router()

teamrouterr.get('/teams', getAllTeams)


module.exports=  teamrouterr;



