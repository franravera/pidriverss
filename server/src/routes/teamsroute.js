const {Router} = require ('express')

const {getTeamsH, getTeamsFrontH} = require ('../handlers/teamshandlers')

const teamrouterr = Router()

 teamrouterr.get('/', getTeamsH)

 teamrouterr.get('/', getTeamsFrontH )

module.exports= { 
    teamrouterr,
    
}



