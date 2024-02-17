const {Router} = require ('express')

const {getTeamsH} = require ('../handlers/teamshandlers')

const teamrouterr = Router()

 teamrouterr.get('/', getTeamsH)



module.exports= { 
    teamrouterr,
    
}