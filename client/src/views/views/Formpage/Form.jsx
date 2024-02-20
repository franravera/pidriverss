import style from "./Form.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import validate from "./validate";
import { getTeams, createDriver } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const allTeams = useSelector((state) => state.allTeams);
  const drivers = useSelector((state) => state.allDrivers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTeams());
  }, []);

  const [form, setForm] = useState({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    birth: "",
    description: "",
    Teams: [], // Cambiar a un solo valor para el ID del equipo
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    nationality: "",
    image: "",
    birth: "",
    description: "",
    Teams: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exist = drivers.find((n) => n.name === form.name);
    if (exist) {
      alert("That driver already exists!");
    } else {
      await dispatch(createDriver(form));
      setForm({
        name: "",
        surname: "",
        nationality: "",
        image: "",
        birth: "",
        description: "",
        Teams: [], // Cambiar a un solo valor para el ID del equipo
      });
      alert("Driver created!");
      navigate("/home");
    }
  };
  

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({
      ...form,
      [property]: value,
    });
    setErrors(
      validate({
        ...form,
        [property]: value,
      })
    );
  };

  const handleTeams = (e) => {
    const selectedTeamId = e; // Aquí tomamos el ID del equipo seleccionado
    setForm((prevForm) => ({
      ...prevForm,
      Teams: [...prevForm.Teams, selectedTeamId], // Agregar el ID del equipo al array de equipos
    }));
  };

  const handleDelete = (teamToDelete) => {
    setForm((prevForm) => ({
      ...prevForm,
      Teams: prevForm.Teams.filter((team) => team !== teamToDelete),
    }));
  };

  const emptyErrors = Object.keys(errors).length === 0;

  return (
    <div className={style.background}>
      <div className={style.bottonHome}>
        <button onClick={() => navigate("/home")} className={style.button}>
          Home
        </button>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
        <div className={style.fullcont}>
          <div className={style.title}>
            <h2>CREATE YOUR DRIVER</h2>
          </div>
          {/* Otros campos del formulario */}
          <div className={style.cont}>
            <label className={style.label}>Name:</label>
            <input
              placeholder="write driver's name..."
              type="text"
              value={form.name}
              onChange={(e) => handleChange(e)}
              name="name"
              className={style.input}
            />
            {errors.name && <p className={style.errors}>{errors.name}</p>}
          </div>
          <div className={style.cont}>
            <label className={style.label}>Surname:</label>
            <input
              placeholder="write driver's surname.."
              type="text"
              value={form.surname}
              onChange={(e) => handleChange(e)}
              name="surname"
              className={style.input}
            />
            {errors.surname && <p className={style.errors}>{errors.surname}</p>}
          </div>
          <div className={style.cont}>
            <label className={style.label}>Nationality:</label>
            <input
              placeholder="write driver's nationality..."
              type="text"
              value={form.nationality}
              onChange={(e) => handleChange(e)}
              name="nationality"
              className={style.input}
            />
            {errors.nationality && (
              <p className={style.errors}>{errors.nationality}</p>
            )}
          </div>
          <div className={style.cont}>
            <label className={style.label}>Image URL:</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => handleChange(e)}
              name="image"
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Birth:</label>
            <input
              type="date"
              value={form.released}
              onChange={(e) => handleChange(e)}
              name="birth"
              className={style.input}
            />
            {errors.birth && <p className={style.errors}>{errors.birth}</p>}
          </div>
          <div className={style.cont}>
            <label className={style.label}>Description:</label>
            <textarea
              placeholder="write driver's description..."
              type="text"
              value={form.description}
              onChange={handleChange}
              name="description"
              className={style.input}
            />
            {errors.description && (
              <p className={style.errors}>{errors.description}</p>
            )}
          </div>
          <div className={style.select}>
            <select
              className={style.select22}
              id="Teams"
              defaultValue=""
              onChange={(e) => handleTeams(e.target.value)}
            >
              <option className={style.option} value="" disabled hidden>
                Choose your teams...
              </option>
              {allTeams.map((team) => {
                return (
                  <option
                    className={style.optionTeams}
                    key={team.id}
                    value={team.id}
                  >
                    {team.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Equipos seleccionados */}
          <div>
            {/* Mapear y ordenar alfabéticamente los nombres de los equipos */}
            {form.Teams.map((teamId) => {
              const team = allTeams.find((t) => t.id.toString() === teamId);
              return team ? team.name : "Team not found";
            })
              .sort((a, b) => a.localeCompare(b))
              .map((teamName, index) => (
                <div className={style.cont22} key={index}>
                  <p>{teamName}</p>

                  <button
                    className={style.buttondelete}
                    type="button"
                    onClick={() => handleDelete(form.Teams[index])} // Utilizar form.Teams[index] como ID del equipo
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>

          <div className={style.buttonNew}>
            {emptyErrors && (
              <button type="submit" className={style.buttonNew}>
                New Driver
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
