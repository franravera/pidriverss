const {Driver, Teams}  = require('../db')
const axios = require('axios');
const { Op } = require('sequelize');
const path = require('path');
//******************************************************************************************************* */
//funcion que mapea la info traida de la api para que solo queden los atributos que necesito
const cleanArray  = (arr)=>{
  const imagePath = path.join(__dirname, 'server', 'src', 'imagen', 'LOGOF1');
  const defaultImageURL = `file://${imagePath}`;
  
  const clean = arr.map(element=>{
    return {
      id:element.id,
      name:isNaN(element.id) ? element.name:element.name.forename,
      surname: isNaN(element.id) ? '': element.name.surname,
      description:element.description,
      image:isNaN(element.id) ? element.image: element.image.url || defaultImageURL ,
      nationality: element.nationality,
      birth: isNaN(element.id) ? element.birth: element.dob,
      teams: isNaN(element.id) ? element.Teams.map((team) => team.name).flat() : element.teams,
      created: isNaN(element.id)? element.created: false,
    }
    
  })
  return clean
}

//******************* */

 // Realizar una consulta a la BDD para obtener información sobre los conductores y sus equipos
const dbDrivers = async ()=>{
  try{       
    const arrDb = await  Driver.findAll({
      include: { model: Teams,
        attributes: ['name'],
        through:{
          attributes:[]
        }
      }
      // Manejar cualquier error que ocurra durante la ejecución de la consulta
    })
    console.log(arrDb);
    const cleanDriversDb = cleanArray(arrDb)
    return cleanDriversDb
}catch (error){
  console.log(error);
}

};


//********************************************************************************************** */
//????
// Realizar una consulta a la API EXTERNA para obtener información sobre los conductores y sus equipos
const apiDriver = async()=>{
  let url = `http://localhost:5000/drivers`;
  try {
    
    const response = await axios.get(url);
    const apiDriverssinmap = response.data;
    // console.log(apiDriverssinmap);
    const apiDriversmapeado = Array.isArray(apiDriverssinmap) ? cleanArray(apiDriverssinmap) : [];

    return apiDriversmapeado;
    
  } catch (error) {
    console.log(error);
  }



};
//???


//********************************************************************************************* */
// Funcion que trae a todos los Drivers tanto los de la BDD como la API
const searchAllDrivers= async ( )=>{
  //busca en BDD
  const databaseUsers = await dbDrivers();
  //buscar en la API
  
  const  apiUsers = await  apiDriver();
  console.log(databaseUsers, "databaseUsers",apiUsers, 'apiUsers');
  //Unificar 
  return [... databaseUsers, ...apiUsers]; 
  
};
const funcionId = async (id, source) => { 
  try {
    let driver;
    
    if (source === 'API') {
      // Si la fuente es una API externa, realiza una solicitud GET a la URL de la API para obtener los datos del conductor
      driver = (await axios.get(`http://localhost:5000/drivers/${id}`)).data;
    } else {
      // Si la fuente es la base de datos local, realiza una consulta para obtener los datos del conductor
      driver =  await  Driver.findByPk(id, {
        include: { model: Teams,
          attributes: ['name'],
          through:{
            attributes:[]
          }
           }
    })
    }
    
    // Si la fuente es una API externa, los datos del conductor se formatean y se limpian utilizando la función cleanArray
    if (source === 'API') {
      driver = cleanArray([driver])[0];
    }
    
    console.log('Driver Information:', driver);
    
    return driver;
  } catch (error) {
    throw error;
  }
};

  // Funcion q busca name entero o poniendo el nombre sin completar y trae hasta 15 result.

const searchByName = async (startingLetter) => {
  try {
    // Obtener conductores de la base de datos cuyos nombres comienzan con la letra proporcionada
    const databaseUsers = await Driver.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }, // Excluir campos no deseados
      include: {
        model: Teams,
        attributes: ['name'],
        through: { attributes: [] }, // Excluir campos de la tabla intermedia
      },
      where: {
        name: {
          [Op.iLike]: `${startingLetter}%`, // Búsqueda insensible a mayúsculas y minúsculas
        },
      },
      limit: 15, // Limitar el número de resultados a 15
    });

    // Obtener todos los conductores de la API externa
    const apiUsersRaw = (await axios.get(`http://localhost:5000/drivers`)).data;

    // Filtrar y limpiar los conductores de la API cuyos nombres comienzan con la letra proporcionada
    const apiUsers = cleanArray(
      apiUsersRaw.filter((user) =>
        user.name.forename.toLowerCase().startsWith(startingLetter.toLowerCase())
      )
    );

    // Combinar conductores de la base de datos y de la API
    const mergedUsers = [...databaseUsers, ...apiUsers];

    // Si no se encuentran conductores, lanzar un error
    if (mergedUsers.length === 0) {
      throw new Error(`No se encontraron conductores cuyos nombres comiencen con la letra ${startingLetter}.`);
    }

    console.log(mergedUsers);

    // Limitar a 15 resultados y devolver el array resultante
    return mergedUsers.slice(0, 15);
  } catch (error) {
    throw error;
  }
};
  
const createDriverDB = async (name, surname, description, image, nationality, birth, Teams) => {
  // Crear el conductor en la base de datos
  const newDriver = await Driver.create({
    name,
    surname,
    description,
    image,
    nationality,
    birth,
  });

  // Asociar el conductor con los equipos indicados por nombre
  // if (Teams && Teams.length > 0) {
  //   const teams = await Teams.findAll({ where: { name: Teams } });
    // console.log(teams);
     newDriver.addTeams(Teams);
  // }

  return newDriver;
};

  
  
  
  
  
  module.exports = { createDriverDB,
    funcionId,
    searchByName,
searchAllDrivers, };