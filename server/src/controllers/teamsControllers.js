const axios = require("axios");
const { Teams } = require('../db');

const getTeamsFrontC=async ()=>{
  const db=  await Teams.findAll()
  return db
}

const estructuraTeams = async () => {
  try {
    const url = 'http://localhost:5000/drivers';
    const apiTeams = (await axios.get(url)).data;

    // Mapear y dividir los nombres de los equipos
    const teams = apiTeams.flatMap(driver => {
      if (driver.teams && typeof driver.teams === 'string') {
        return driver.teams.split(',').map(team => team.trim());
      } else {
        return [];
      }
    });

    
    // Eliminar duplicados
    const uniqueTeams = teams.filter((value, index, array)=> array.indexOf(value)===index);
  const teamsOrdenados = uniqueTeams.sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()))



    // Utilizamos ignoreDuplicates: true para evitar la inserción de registros duplicados
    await Promise.all(teamsOrdenados.map(async(team)=>{
      const createTeam= await  Teams.create({name: team})
    // console.log(`teamCreado : ${createTeam.name}`);
    }))

    const todosLosTeams = await Teams.findAll();
    return todosLosTeams;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  estructuraTeams,
  getTeamsFrontC
};
