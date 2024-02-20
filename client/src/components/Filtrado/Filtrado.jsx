import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeams } from "../../redux/actions";

const Filtrados = ({ handleOrder, handleOrigin, handleTeams }) => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.allTeams);

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  return (
    <div>
      <select onChange={(e) => handleOrder(e)}>
        <option value="">Alphabetically</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
      <select id="teams" onChange={(e) => handleTeams(e)}>
        <option value="">All scuderias</option>
        {teams &&
          teams
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((t) => {
              return (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              );            
            })}
      </select>

      <select onChange={(e) => handleOrigin(e)}>
        <option value="">All drivers</option>
        <option value="api">Api</option>
        <option value="created">My creations</option>
      </select>
    </div>
  );
};

export default Filtrados;
