const { json } = require('sequelize');

const {createDriverDB, funcionId, searchAllDrivers, searchByName} = require ('../controllers/driversControllers')
 

const getAllDrivers = async (req, res )=>{
// Obtiene un arreglo de objetos, donde cada objeto es un driver con su información.
const {name} = req.query
try {
const search = name ? await searchByName(name) : await searchAllDrivers()   
res.status(200).json(search);} catch(error) {

    res.status(400).json("NO EXISTE ")
}
};





const getIdDrivers =async (req, res) => {
    const { idDriver } = req.params;
  const source= isNaN(idDriver)? "BDD" : "API";
    try {
      const dridri = await funcionId(idDriver, source);
      res.status(200).json(dridri)
    } catch (error) {

      res.status(400).json("NO EXISTE ESE ID...")
      console.error(error);
    };


    // res.json({ message: `Este es el GET de drivers por id ${idDriver}` });
  };
   


const createDrivers = async (req,res) => { 
//     Esta ruta recibirá todos los datos necesarios para crear un driver y relacionarlo con sus teams solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un driver en la base de datos, y este debe estar relacionado con sus teams indicados (al menos uno).
const {name, surname, description, image, nationality, birth, Teams } = req.body;
try { 
  const newDriver = await createDriverDB (name, surname, description,image,nationality,birth, Teams);
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