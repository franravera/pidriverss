import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getIdDrivers } from '../../../redux/actions'; 


function DetailPage() {
  // Obtén los detalles del conductor por ID del estado global
  const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getIdDrivers(id))
  },[dispatch]);
  const driverId = useSelector((state) => state.idDrivers);


  return (
    <div>
      <h1>Welcome to the detail Page</h1>
      {/* Renderizar los detalles del conductor */}
      <div>
        <img src={driverId.image} alt="Driver" />
        <p>Id: {driverId.id}</p>
        <p>Name: {driverId.name}</p>
        <p>Surname: {driverId.surname}</p>
        <p>Nationality: {driverId.nationality}</p>
        <p>Description: {driverId.description}</p>
        <p>Birth: {driverId.birth}</p>
        <p>Teams: {driverId.teams}</p>

        {/* Agrega más detalles según sea necesario */}
      </div>
    </div>
  );
}

export default DetailPage;
