const {Driver}  = require('../db')
const {axios} = require ('axios')



const createDriverDB = async (name, surname, description, image, nationality, birth) => {
    const newDriver = await Driver.create({ name, surname, description, image, nationality, birth });
    return newDriver;
  };
  
  const funcionId = async (idDriver,source)=>{
    const dridri = source==="API"?
    (await axios.get(`http://localhost:5000/drivers/${id}`)).data
    :await Driver.findByPk(idDriver);
    return dridri
   };


  module.exports = { createDriverDB,
  funcionId };