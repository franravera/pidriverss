import { GET_TEAMS, GET_ALL_DRIVERS, GET_NAME_DRIVER,GET_ID_DRIVERS, RESET_NAME_DRIVERS,CREATE_DRIVER, FILTER_BY_ORDER,FILTER_BY_ORIGIN,FILTER_BY_TEAMS } from "./actions";

const initialState = {
    allDrivers: [], 
    nameDrivers: [], 
    idDrivers: [],
    copiaArrayDrivers: [],
    allTeams:[],

}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DRIVERS:
            // Fusiona los conductores nuevos con los existentes en el estado
            return {
                ...state,
                allDrivers:action.payload,
                copiaArrayDrivers:action.payload,
            };

            case GET_TEAMS:
                return{
                    ...state,
                    allTeams:action.payload
                }

        case GET_NAME_DRIVER:
            // Actualiza la lista de conductores filtrados por nombre
            return {
                ...state,
                nameDrivers: action.payload,
            };
            
            case GET_ID_DRIVERS:
                return {
                    ...state,
                    idDrivers: action.payload,
                };

            case FILTER_BY_ORIGIN:
                let getDrivers = state.copiaArrayDrivers;
                let filtrado = []
            
                switch(action.payload) {
                case 'api': filtrado = getDrivers.filter(el => typeof (el.id) === 'number'); break;
                case 'created': filtrado = getDrivers.filter(el => isNaN(el.id)); break;
                default: filtrado = getDrivers; break;
                }
                return {
                ...state,
                allDrivers: filtrado
                };

                case FILTER_BY_TEAMS:
                    let aux = [];
                    if (action.payload) {
                        aux = state.copiaArrayDrivers.filter(e => {
                            if (typeof e.teams === 'string') { // Verificar si e.teams es una cadena
                                const arr = e.teams.split(',').map(team => team.trim());
                                if (arr.some(e => e === action.payload)) {
                                    return true;
                                }
                            }
                            return false;
                        });
                    } else {
                        aux = state.copiaArrayDrivers;
                    }
                    return {
                        ...state,
                        allDrivers: aux
                    };
                
         
                
            // let aux;
        
            // if(action.payload){ // si la action es FILTER BY TEAMS
            //     aux= state.copiaArrayDrivers.filter(driver=>{    //state.copiaArrayDrivers son todos los drivers,
            //         //  
            //         if (driver.Teams){
            //             return driver.Teams
            //         }
            //         else if(driver.Teams.some(driver=>driver.name===action.payload)){
            //             return driver.Teams.map(el=>el.name)
            //         } else {return driver.Teams.includes(action.payload)}
                    
            //     })

            // } else{
            //     aux = state.copiaArrayDrivers
            // }
            
            // return { ...state, 
            //     teams : aux,
            //     };

             


                
            case FILTER_BY_ORDER:
            let vgCopy = [...state.allDrivers]; //hago una copia de mi estado importante
            let ordenamiento

            switch (action.payload) {
                case 'All':
                    ordenamiento = [...state.allDrivers];
                    break;
                case 'A-Z':
                    ordenamiento = vgCopy.sort(function(a, b) {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        }
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1
                        }
                        return 0;
                    });
                    break;
                case 'Z-A':
                    ordenamiento = vgCopy.sort(function(a, b) {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) {
                            return 1;
                          }
                          if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1;
                          }
                          return 0;
                    })
                    break;                
                default:
                    ordenamiento = vgCopy
                    break;
            }
            return {
                ...state,
                allDrivers: ordenamiento,
                copia : ordenamiento
            };

                case CREATE_DRIVER:
                    return{
                        ...state,
                        allDrivers: action.payload,
                    };


                
            
        case RESET_NAME_DRIVERS:
                   // Restablece el estado de los conductores filtrados por nombre al estado inicial (un array vacío)
          return {
          ...state,
          nameDrivers: [],
          };
        default:
            // Devuelve el estado actual si la acción no es reconocida
            return state;
            
    }
};

export default rootReducer;