const {estructuraTeams} = require('../controllers/teamsControllers')





const getTeamsH = async (req,res) =>{

    try {
        const newTeam= await estructuraTeams();
        res.status(201).json(newTeam)
    } catch (error) {
        res.status(400).json({error:error.message});
        
    }
};


module.exports = { getTeamsH }