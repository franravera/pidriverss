import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetNameDrivers } from "../../redux/actions";
import style from "./navBar.module.css";
import SearchBar from "../searchBar/searchBar";
import {getAllDrivers, filterByOrigin, filterByOrder} from "../../redux/actions"
import Filtrados from "../Filtrado/Filtrado";

const NavBar = () => {
  const dispatch = useDispatch();

  // Función para restablecer el estado de búsqueda
  const handleResetSearch = () => {
    dispatch(resetNameDrivers());
  };
  
  function handleOrigin(e) {
    e.preventDefault()
    if(e.target.value === '') {
        dispatch(getAllDrivers())
    } else {
        dispatch(filterByOrigin(e.target.value))
        
    }
  }
  
  function handleTeams(e) {
    e.preventDefault()
    if(e.target.value === '') {
        dispatch(getAllDrivers())
    } else {
        dispatch(filterByTeams(e.target.value))
        
    }
  }
  
  function handleOrder(e) {
    e.preventDefault()
    if(e.target.value === '') {
        dispatch(getAllDrivers())
    } else {
        dispatch(filterByOrder(e.target.value))
        
    }
  }  





  return (
    <div className={style.mainContainer}>
      {/* Botón para la página de inicio con función para restablecer búsqueda */}
      <Link to="/home" onClick={handleResetSearch} >
        <button className={style.button2}>Home</button>
      </Link>
      <Filtrados handleOrigin={handleOrigin} handleTeams={handleTeams} handleOrder={handleOrder}/>
      
      <SearchBar />
      <Link to="/create" >
        <button className={style.button1}>Create Driver</button>
      </Link>
 
    </div>
  );
};

export default NavBar;
