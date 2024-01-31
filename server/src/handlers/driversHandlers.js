const { json } = require('sequelize');

const {createDriverDB, funcionId} = require ('../controllers/driversControllers')
 

const getAllDrivers = (req, res )=>{
// Obtiene un arreglo de objetos, donde cada objeto es un driver con su información.
const {name} = req.query
if (name) res.send(`Quiero buscar todos los que se llamen ${name}`)
else res.send('este es el get de TODOS los drivers' );
};


//const getNameDrivers = (req,res) => { 
    // Esta ruta debe obtener los primeros 15 drivers que se encuentren con la palabra recibida por query.
    // Debe poder buscarlo independientemente de mayúsculas o minúsculas.
    // Si no existe el driver, debe mostrar un mensaje adecuado.
    // Debe buscar tanto los de la API como los de la base de datos.
     ///   const {name} = req.params;
      //  res.send(`Hola, ${name}!`);
    
//};


const getIdDrivers =async (req, res) => {
    const { idDriver } = req.params;
  const source= isNaN(idDriver)? "BDD" : "API";
    try {
      const dridri = await funcionId(idDriver, source);
      res.status(200).json(dridri)
    } catch (error) {

      res.status(400).json("ERROR MEN ")
    };


    // res.json({ message: `Este es el GET de drivers por id ${idDriver}` });
  };
   


const createDrivers = async (req,res) => { 
//     Esta ruta recibirá todos los datos necesarios para crear un driver y relacionarlo con sus teams solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un driver en la base de datos, y este debe estar relacionado con sus teams indicados (al menos uno).
const {name, surname, description, image, nationality, birth } = req.body;
try { 
  const newDriver = await createDriverDB (name, surname, description,image,nationality,birth);
  res.status(201).json(newDriver);
} catch (error) { res.status(400).json({error: error.message});
  
}
};




module.exports = {
    getAllDrivers,
    // getNameDrivers,
    getIdDrivers,
    createDrivers
};