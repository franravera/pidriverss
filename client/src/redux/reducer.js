import { GET_ALL_DRIVERS, GET_NAME_DRIVER, RESET_NAME_DRIVERS } from "./actions";

const initialState = {
    allDrivers: [], // Renombrado de 'users' a 'allDrivers' para mantener la consistencia
    nameDrivers: [], // Nuevo array para almacenar los conductores filtrados por nombre
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DRIVERS:
            // Fusiona los conductores nuevos con los existentes en el estado
            return {
                ...state,
                allDrivers: [...state.allDrivers, ...action.payload],
            };
        case GET_NAME_DRIVER:
            // Actualiza la lista de conductores filtrados por nombre
            return {
                ...state,
                nameDrivers: action.payload,
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
