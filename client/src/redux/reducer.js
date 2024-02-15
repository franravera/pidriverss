import { GET_ALL_DRIVERS, GET_NAME_DRIVER,GET_ID_DRIVERS, RESET_NAME_DRIVERS, FILTER_BY_ORDER,FILTER_BY_ORIGIN,FILTER_BY_TEAMS } from "./actions";

const initialState = {
    allDrivers: [], 
    nameDrivers: [], 
    idDrivers: [],
    copia: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DRIVERS:
            // Fusiona los conductores nuevos con los existentes en el estado
            return {
                ...state,
                allDrivers:action.payload,
                copia:action.payload
            };

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
            let aux = [];
            
            if(action.payload){
                aux= state.copia.filter(elemto=>{
                    if (!elemto.teams){
                        return elemto.teams.some(elemto.)
                    }
                    else if(elemto.teams)
                    
                })
            }
            
            
            
            return { 


                }

            case FILTER_BY_ORDER:
                return {

                }    



                
            
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
