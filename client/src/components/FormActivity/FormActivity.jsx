import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postActivity } from "../../redux/actions";
import {
  validateName,
  validateDifficulty,
  validateDuration,
} from "./ActivityData/validationsForActivities";
import "./FormActivity.css";

const FormActivity = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [countries, setCountries] = useState("");
  const dispatch = useDispatch();
  const [notEmptyCountry, setNotEmptyCountry] = useState("");
  const [durationValidation, setDurationValidation] = useState(false);
  const [difficultyValidation, setDifficultyValidation] = useState(false);
  const [nameValidation, setNameValidation] = useState(false);

  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };
  const handleDifficultyChange = (event) => {
    setDifficultyValidation(validateDifficulty(event.target.value));
    setDifficulty(event.target.value);
  };
  const handleCountriesChange = (event) => {
    const countriesInput = event.target.value;
    let countriesArr = [];

    if (countriesInput.includes(",")) {
      countriesArr = countriesInput.split(",").map((country) => country.trim());
    } else {
      countriesArr = [countriesInput.trim()];
    }
    setCountries(countriesArr);
    setNotEmptyCountry(countriesArr);
  };
  const handleNameChange = (event) => {
    setNameValidation(validateName(event.target.value));
    setName(event.target.value);
  };
  const handleDurationChange = (event) => {
    setDurationValidation(validateDuration(event.target.value));
    setDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, duration, difficulty, season } = event.target.elements;
    dispatch(
      postActivity(
        name.value,
        duration.value,
        difficulty.value,
        countries,
        season.value
      )
    );
  };
  
  const isFormValid =
    durationValidation &&
    difficultyValidation &&
    nameValidation &&
    selectedSeason !== "" &&
    notEmptyCountry !== "";
    console.log(isFormValid)

  return (
    <div className="form-container">
      <h1>Crear Actividad Turistica</h1>
      <form onSubmit={handleSubmit}>
        <label className="labelText" htmlFor="name">
          Ingrese el nombre de la actividad:
        </label>
        <input
          type="text"
          value={name}
          placeholder="Nombre de su actividad"
          name="name"
          onChange={handleNameChange}
        />
        <label className="labelText" htmlFor="duration">
          Ingrese la duración de la actividad:
        </label>
        <input
          type="text"
          value={duration}
          placeholder="Duración de la actividad (Valor en horas de 1 a 5)"
          name="duration"
          onChange={handleDurationChange}
        />
        <label className="labelText" htmlFor="difficulty">
          Ingrese la dificultad de la actividad:
        </label>
        <input
          type="text"
          value={difficulty}
          placeholder="Dificultad (Valor numerico de 1 a 5)"
          name="difficulty"
          onChange={handleDifficultyChange}
        />
        <label>Temporada</label>
        <select
          id="season"
          value={selectedSeason}
          onChange={handleSeasonChange}
        >
          <option value="">Seleccione una temporada</option>
          <option value="Verano">Verano</option>
          <option value="Otoño">Otoño</option>
          <option value="Invierno">Invierno</option>
          <option value="Primavera">Primavera</option>
        </select>
        <label>País/es</label>
        <input
          className="inputFormAct"
          type="text"
          value={countries}
          placeholder="País/es de su actividad"
          name="countries"
          onChange={handleCountriesChange}
        ></input>
        <button type="submit" disabled={!isFormValid}>
          Crear
        </button>
      </form>
    </div>
  );
};

export default FormActivity;
