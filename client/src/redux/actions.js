import {
  GET_COUNTRIES,
  POST_ACTIVITY,
  GET_ACTIVITIES,
} from "./actionsType";
import axios from "axios";

const URL = "http://localhost:3001/";

export const getCountries = (page, continent, sort) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}all?page=${page}` +
          (continent ? `&continent=${continent}` : ``) +
          (sort ? `&sort=${sort}` : ``)
      );
      dispatch({
        type: GET_COUNTRIES,
        payload: {
          countries: data.countries,
          totalPages: data.totalPages,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const postActivity = (name, duration, difficulty, countries, season) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL}activities`, {
        name: name,
        duration: duration,
        difficulty: difficulty,
        countries: countries,
        season: season,
      });
      dispatch({ type: POST_ACTIVITY, payload: data });
      alert(data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Mostrar mensaje de error específico del servidor
        alert(error.response.data.message);
      } else {
        // Mostrar mensaje de error genérico
        alert("Error al procesar la solicitud");
      }
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL}activities`);
      dispatch({ type: GET_ACTIVITIES, payload: data });
    } catch (error) {
      console.log(
        "Error al mostrar los datos de la actividad al servidor",
        error
      );
    }
  };
};
