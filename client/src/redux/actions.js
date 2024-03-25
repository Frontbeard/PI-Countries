import {
  FILTER_BY_CONTINENT,
  SORT_ALPHABETICALLY,
  GET_COUNTRIES,
  SORT_BY_POPULATION,
  SET_TOTAL_PAGES,
  SET_CURRENT_PAGE,
  POST_ACTIVITY,
  GET_ACTIVITIES,
} from "./actionsType";
import axios from "axios";

const URL = "http://localhost:3001/";

export const getCountries = (page, continent) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${URL}all?page=${page}` +
          (continent ? `&filters=continent=${continent}` : ``)
      );
      dispatch({ type: GET_COUNTRIES, payload: data.countries });
      dispatch({ type: SET_TOTAL_PAGES, payload: data.totalPages });
      dispatch({ type: SET_CURRENT_PAGE, payload: data.page });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};
export const filterCountryByContinent = (continent) => {
  return { type: FILTER_BY_CONTINENT, payload: continent };
};

export const orderCountry = (order) => {
  return { type: SORT_ALPHABETICALLY, payload: order };
};

export const sortByPopulation = (order) => {
  return { type: SORT_BY_POPULATION, payload: order };
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
      alert(data.message)
      }
     catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Mostrar mensaje de error específico del servidor
        alert(error.response.data.message);
      } else {
        // Mostrar mensaje de error genérico
        alert("Error al procesar la solicitud");
      }
    }
  };
}

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
}