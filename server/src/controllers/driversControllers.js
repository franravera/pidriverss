const {Driver}  = require('../db')
const axios = require('axios');




const createDriverDB = async (name, surname, description, image, nationality, birth) => {
    const newDriver = await Driver.create({ name, surname, description, image, nationality, birth });
    return newDriver;
  };
  
  const funcionId = async (id,source)=>{
    const dridri =
     source==="API"? (await axios.get(`http://localhost:5000/drivers/${id}`)).data 
    
    :await Driver.findByPk(id);
    
    return dridri
    
   };


  module.exports = { createDriverDB,
  funcionId };