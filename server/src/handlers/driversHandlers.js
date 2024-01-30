
 

const getAllDrivers = (req, res )=>{
// Obtiene un arreglo de objetos, donde cada objeto es un driver con su información.
res.json({ message: 'este es el get de TODOS los drivers' });
};


const getNameDrivers = (req,res) => { 
    // Esta ruta debe obtener los primeros 15 drivers que se encuentren con la palabra recibida por query.
    // Debe poder buscarlo independientemente de mayúsculas o minúsculas.
    // Si no existe el driver, debe mostrar un mensaje adecuado.
    // Debe buscar tanto los de la API como los de la base de datos.
        const {name} = req.params.name;
        res.send(`Hola, ${name}!`);
    
};


const getIdDrivers = (req,res) => { 
//Esta ruta obtiene el detalle de un driver específico.
// Es decir que devuelve un objeto con la información pedida en el detalle de un driver.
//El driver es recibido por parámetro (ID).
//Tiene que incluir los datos del/los team/s del driver al que está asociado.
//Debe funcionar tanto para los drivers de la API como para los de la base de datos.
const {id} = req.params.id
res.json({ message: `este es el get de drivers por id ${id}` });
};


const createDrivers = (req,res) => { 
//     Esta ruta recibirá todos los datos necesarios para crear un driver y relacionarlo con sus teams solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un driver en la base de datos, y este debe estar relacionado con sus teams indicados (al menos uno).

res.json({ message: 'POST de drivers' });

};




module.exports = {
    getAllDrivers,
    getNameDrivers,
    getIdDrivers,
    createDrivers
};