import React from 'react';
import { Link } from 'react-router-dom';
import styles from "../Card/card.module.css";

const Card = ({ driver }) => {
  
  return (
    <div className={styles.card}>
      {/* Renderizar la imagen */}
      <img src={driver.image} alt={driver.name} />
      <h2>{driver.name} {driver.surname}</h2>
      {/* Verificar si la propiedad "teams" está presente */}
      {driver.teams && (
        <p>
          Scuderias:{' '}
          {/* Verificar si "teams" es un array */}
          {Array.isArray(driver.Teams) ? (
            // Si es un array, mapear y mostrar los nombres de los equipos
            driver.Teams.map((team, index) => (
              <span key={index}>
                {team.name}
                {/* Agregar una coma y espacio si no es el último elemento */}
                {index !== driver.Teams.length - 1 && ', '}
              </span>
            ))
          ) : (
            // Si no es un array, renderizar el nombre del equipo
            <span>{driver.teams}</span>
          )}
        </p>
      )}
      {/* Enlace para ir al detalle del conductor */}
      <button className={styles.button} onClick={() => window.location.href=`/detail/${driver.id}`}>
        View detail
      </button>
    </div>
  );
};

export default Card;
