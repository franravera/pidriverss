import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetNameDrivers } from "../../redux/actions";
import style from "./navBar.module.css";
import SearchBar from "../searchBar/searchBar";

const NavBar = () => {
  const dispatch = useDispatch();

  // Función para restablecer el estado de búsqueda
  const handleResetSearch = () => {
    dispatch(resetNameDrivers());
  };

  return (
    <div className={style.mainContainer}>
      {/* Botón para la página de inicio con función para restablecer búsqueda */}
      <Link to="/home" onClick={handleResetSearch} >
        <button className={style.button2}>Home</button>
      </Link>
      {/* Botón para la página de creación */}
      <SearchBar />
      <Link to="/create" >
        <button className={style.button1}>Create Driver</button>
      </Link>
 
    </div>
  );
};

export default NavBar;
