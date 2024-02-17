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
                return{

                }

            case FILTER_BY_TEAMS:
            let aux;
        
            if(action.payload){ // si la action es FILTER BY TEAMS
                aux= state.copiaArrayDrivers.filter(driver=>{    //state.copiaArrayDrivers son todos los drivers,
                    //  
                    if (driver.Teams){
                        return driver.Teams
                    }
                    else if(driver.Teams.some(driver=>driver.name===action.payload)){
                        return driver.Teams.map(el=>el.name)
                    } else {return driver.Teams.includes(action.payload)}
                    
                })

            } else{
                aux = state.copiaArrayDrivers
            }
            
            return { ...state, 
                teams : aux,
                };

             


                
            case FILTER_BY_ORDER:
                return {

                }    

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
