const axios = require("axios");
const { Teams } = require('../db');

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
    const uniqueTeams = [...new Set(teams)];

    // Consultamos solo los equipos que ya existen en la base de datos
    const existingTeams = await Teams.findAll({
      where: { name: uniqueTeams },
    });

    // Filtramos los equipos que no existen en la base de datos
    const newTeams = uniqueTeams.filter(team => !existingTeams.some(existingTeam => existingTeam.name === team));

    // Utilizamos ignoreDuplicates: true para evitar la inserción de registros duplicados
    await Teams.bulkCreate(newTeams.map(name => ({ name })), { ignoreDuplicates: true });

    const todosLosTeams = await Teams.findAll();
    return todosLosTeams;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  estructuraTeams,
};
