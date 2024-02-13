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
      {/* Enlace para la página de inicio con función para restablecer búsqueda */}
      <Link to="/home" onClick={handleResetSearch}>
        Home
      </Link>
      <Link to="/create">Create</Link>
      {/* Renderiza la SearchBar */}
      <SearchBar />
    </div>
  );
};

export default NavBar;
