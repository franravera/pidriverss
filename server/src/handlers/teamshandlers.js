const {estructuraTeams, getTeamsFrontC} = require('../controllers/teamsControllers')


const getTeamsFrontH = async (req,res) =>{
    try {
        const responseController = await getTeamsFrontC()
return res.status(200).json(responseController)}
catch(error) {
    res.status(400).json({error: error.message})
}
}


const getTeamsH = async (req,res) =>{

    try {
        const newTeam= await estructuraTeams();
        res.status(201).json(newTeam)
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
};


module.exports = { getTeamsH,getTeamsFrontH }


