import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameDriver } from '../../redux/actions';
import style from "../searchBar/searchBar.module.css"
const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Dispara la acción para buscar conductores por nombre
    dispatch(getNameDriver(searchTerm));
    // Limpia el campo de búsqueda después de realizar la búsqueda
    setSearchTerm("");
  };

  const handleKeyPress = (event) => {
    // Verifica si se presionó la tecla "Enter"
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={style.search}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search by name..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
