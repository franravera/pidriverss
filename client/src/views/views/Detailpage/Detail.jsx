import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useNavigate
import { getIdDrivers } from "../../../redux/actions";
import style from "../Detailpage/Detail.module.css";

function DetailPage() {
  // Obtén los detalles del conductor por ID del estado global
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Usa useNavigate para manejar la navegación
  useEffect(() => {
    dispatch(getIdDrivers(id));
  }, [dispatch]);
  const driverId = useSelector((state) => state.idDrivers);

  const renderTeams = () => {
    if (Array.isArray(driverId.Teams) && driverId.Teams.length > 0) {
      // Si `teams` es un array con elementos, renderizamos todos los nombres de los equipos
      return (
        <div>
          {driverId.Teams.map((team, index) => (
            <p key={index}>{team.name}</p>
          ))}
        </div>
      );
    } else if (typeof driverId.teams === "string") {
      // Si `teams` es una cadena de texto, la dividimos por comas y renderizamos cada equipo
      const teams = driverId.teams.split(",").map((team) => team.trim());
      return (
        <div>
          {teams.map((team, index) => (
            <p key={index}>{team}</p>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={style.fondo}>
      <button className={style.bottonHome} onClick={() => navigate("/home")}>
        Home
      </button>
      <div className={style.contenedorDeTodo}>
        <h1 className={style.titulo}>Driver detail</h1>
        {/* Renderizar los detalles del conductor */}
        <div>
          <div className={style.divImage}>
            <img src={driverId.image} alt="Driver" />
          </div>

          <p className={style.p}>Id: {driverId.id}</p>
          <p className={style.p}>Name: {driverId.name}</p>
          <p className={style.p}>Surname: {driverId.surname}</p>
          <p className={style.p}>Nationality: {driverId.nationality}</p>
          <p className={style.p}>Description: {driverId.description}</p>
          <p className={style.p}>Birth: {driverId.birth}</p>
          <p className={style.p}>Teams: {renderTeams()}</p>

          {/* Agrega más detalles según sea necesario */}
        </div>

        {/* Botón Home */}
      </div>
    </div>
  );
}

export default DetailPage;
