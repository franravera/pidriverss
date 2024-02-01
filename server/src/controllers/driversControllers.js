const {Driver, Teams}  = require('../db')
const axios = require('axios');
const { Op } = require('sequelize');
const path = require('path');

//********************************************************************************************** */
const createDriverDB = async (name, surname, description, image, nationality, birth) => {
    const newDriver = await Driver.create({ name, surname, description, image, nationality, birth });
    return newDriver;
  };
  //********************************************************************************************* */
  const funcionId = async (id, source) => {
    try {
      let driver;
  
      if (source === 'API') {
        // Obtener datos del API
        driver = (await axios.get(`http://localhost:5000/drivers/${id}`)).data;
      } else {
        // Obtener datos de la base de datos con la asociación a Team
        driver = await Driver.findByPk(id, { include: Teams });
      }
  
      // Aplicar limpieza si el driver proviene de la API
      if (source === 'API') {
        driver = cleanArray([driver])[0];
      }
  
      console.log('Driver Information:', driver);
  
      return driver;
    } catch (error) {
      throw error;
    }
  };


const cleanArray  = (arr)=>{
    const imagePath = path.join(__dirname, 'server', 'src', 'imagen', 'LOGOF1');
    const defaultImageURL = `file://${imagePath}`;

    const clean = arr.map(element=>{
      return {
        id:element.id,
        name:element.name.forename,
        surname: element.name.surname,
        description:element.description,
        image: element.image.url || defaultImageURL ,
        nationality: element.nationality,
        birth: element.dob ,
        teams:element.teams,
        created: false,
      }
      
    })
    return clean
  }

   const searchAllDrivers= async ( )=>{
    //busca en BDD, buscar en API 
    const databaseUsers = await Driver.findAll({
      include: Teams, // Asegúrate de tener la asociación definida en tu modelo Driver
    });

    const apiUsersRAw = (await axios.get ('http://localhost:5000/drivers')).data;
const apiUsers = cleanArray(apiUsersRAw);
//console.log(apiUsers);
 return [... databaseUsers, ...apiUsers]; 
    //Unificar 

   };

// Función para buscar conductores por nombre
const searchByName = async (name2) => {
  try {
    const databaseUsers = await Driver.findAll({ include: Teams,

      where: {
        name: {
          [Op.iLike]: `%${name2}%`, // Búsqueda insensible a mayúsculas y minúsculas
        },
      },
      limit: 15,
    });
    const nameSensible = (props) =>  {
      
      return props.charAt(0).toUpperCase() + props.slice(1).toLowerCase();
    }


    const apiUsersRaw = (await axios.get(`http://localhost:5000/drivers?name.forename=${nameSensible(name2)}`)).data;


    const apiUsers = cleanArray(apiUsersRaw); //CleanArray filtra la informacion de la API

    // const apiUser = apiUsers.filter(user => user.name.toUpperCase().includes(nameSensible));

    const mergedUsers = [...databaseUsers, ...apiUsers];

    if (mergedUsers.length === 0 ) {
      throw new Error('No se encontraron conductores con el nombre proporcionado.');
    }

    return mergedUsers.slice(0, 15); // Limitar a 15 resultados
  } catch (error) {
    throw error;
  }
};



  module.exports = { createDriverDB,
  funcionId,
  searchByName,
searchAllDrivers, };