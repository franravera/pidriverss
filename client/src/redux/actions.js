
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


export const RESET_NAME_DRIVERS = "RESET_NAME_DRIVERS";

export const resetNameDrivers = () => {
  return { type: RESET_NAME_DRIVERS };
};