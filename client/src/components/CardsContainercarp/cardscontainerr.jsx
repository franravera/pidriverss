import { useEffect } from "react";
import { getAllDrivers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/card"; // Importa el componente Card que quieres renderizar
import styles from "../CardsContainercarp/cardscontainerr.module.css";

const CardsContainer = () => {
  const dispatch = useDispatch();
  const { allDrivers, nameDrivers } = useSelector((state) => state); // Obtén los arrays de conductores del estado global

  useEffect(() => {
    dispatch(getAllDrivers());
  }, [dispatch]); // Agrega dispatch como dependencia para evitar una advertencia de ESLint

  // Usa el array de conductores filtrados por nombre si está presente, de lo contrario, usa todos los conductores
  const driversToRender = nameDrivers.length > 0 ? nameDrivers : allDrivers;

  // Función de limpieza para restablecer el estado de búsqueda cuando el componente se desmonte
  useEffect(() => {
    return () => {
      dispatch({ type: "GET_NAME_DRIVER", payload: [] }); // Restablece nameDrivers a un array vacío
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <p>Este componente debe tomar un array de usuarios y por cada usuario renderizar un componente card.</p>
      {/* Utiliza map para recorrer el array de conductores y renderizar un componente Card para cada uno */}
      {driversToRender.map((driver) => (
        <Card key={driver.driverId} driver={driver} />
      ))}
    </div>
  );
};

export default CardsContainer;

