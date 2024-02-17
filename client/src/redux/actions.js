
import axios from 'axios';

export const GET_ALL_DRIVERS = "GET_ALL_DRIVERS";

export const getAllDrivers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:3001/drivers');
      const drivers = response.data;
      dispatch({ type: GET_ALL_DRIVERS, payload: drivers });
    } catch (error) {
      console.error('Error fetching drivers:', error);
      // Puedes manejar el error como consideres apropiado
    }
  };
};



export const GET_NAME_DRIVER = "GET_NAME_DRIVER";

export const getNameDriver = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/drivers?name=${name}`);
      const drivers = response.data;
      dispatch({ type: GET_NAME_DRIVER, payload: drivers });
    } catch (error) {
      console.error('Error fetching drivers by name:', error);
      
    }
  };
};

 export const GET_ID_DRIVERS="GET_ID_DRIVERS"

 export const getIdDrivers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/driver/${id}`);
      const driver = response.data; // Aquí se obtiene el conductor individual
      console.log(driver)
      dispatch({ type: GET_ID_DRIVERS, payload: driver }); // Se envía el conductor al store
    } catch (error) {
      console.error("Error fetching driver by ID:", error);
    }
  };
};


export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";

export const filterByOrigin= (payload)=>{
  return ({type: FILTER_BY_ORIGIN,
           payload})
} 

export const FILTER_BY_ORDER = "FILTER_BY_ORDER";

export const filterByOrder= (payload)=>{
  return ({type: FILTER_BY_ORDER,
           payload})
} 

export const GET_TEAMS= "GET_TEAMS"

export const getTeams =  ()=>{
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/getTeams`);
      const teams = response.data; 
      console.log(teams)
      dispatch({ type: GET_TEAMS, payload: teams }); 
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
    return ({type: GET_TEAMS,
    payload})
  };
};

export const CREATE_DRIVER = "CREATE_DRIVER";
export const createDriver = (driver) => {
  return async (dispatch) => {
      try {
          const { data } = await axios.post('http://localhost:3001/drivers', driver);
          return dispatch({
              type: CREATE_DRIVER,
              payload: data
          });            
      } catch (error) {
          console.log(error);            
      }
  }
};



export const FILTER_BY_TEAMS = "FILTER_BY_TEAMS";

export const filterByTeams= (payload)=>{
  return ({type: FILTER_BY_TEAMS,
           payload})
} 

export const RESET_NAME_DRIVERS = "RESET_NAME_DRIVERS";

export const resetNameDrivers = () => {
  return { type: RESET_NAME_DRIVERS };
};


