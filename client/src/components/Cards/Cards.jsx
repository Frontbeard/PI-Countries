import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
  filterCountryByContinent,
  orderCountry,
  sortByPopulation,
} from "../../redux/actions";
import "./Cards.css";

const Main = ({ searchResults }) => {
  const [continent, setContinent] = useState("");
  const { filteredCountries, totalPages, currentPage } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    setContinent(event.target.value);
  };
  const handleOrder = (event) => {
    dispatch(orderCountry(event.target.value));
  };
  const handlePopulationOrder = (event) => {
    dispatch(sortByPopulation(event.target.value));
  };
  const handlePageChange = (currentPage) => {
    dispatch(getCountries(currentPage));
  };
  const renderPaginationButtons = () => {
    return Array.from({ length: totalPages }, (_, page) => {
      const pageNumber = page + 1;
      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      );
    });
  };

  useEffect(() => {
    dispatch(getCountries(currentPage, continent));
  }, [dispatch, currentPage, continent]);

  const displayCountries =
    searchResults.length > 0 ? searchResults : filteredCountries;
  return (
    <div>
      <h1>Main</h1>
      <label className="filterSelect" htmlFor="continentSelector">
        Elegir Continente:{" "}
      </label>
      <select onChange={handleFilter}>
        <option value="">Mostrar todo</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">America</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Antarctic">Antartica</option>
      </select>
      <label className="filterSelect" htmlFor="orderSelector">
        Ordenar Alfabéticamente:{" "}
      </label>
      <select onChange={handleOrder}>
        <option value="">Mostrar todo</option>
        <option value="A">Ascendente</option>
        <option value="D"> Descendente</option>
      </select>
      <label className="filterSelect" htmlFor="populationSelector">
        Ordenar por población:{" "}
      </label>
      <select onChange={handlePopulationOrder}>
        <option value="">Mostrar todo</option>
        <option value="populationA">Ascendente</option>
        <option value="populationD"> Descendente</option>
      </select>
      <div className="cardHolder">
        <ul>
          {displayCountries.map((country) => (
            <li key={country.id}>
              {country.name}
              <br />
              {country.continent}
              <br />
              <Link to={`/countries/detail/${country.id}`}>
                <img
                  className="flagImg"
                  src={country.flagImage}
                  alt={country.name}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>{renderPaginationButtons()}</div>
    </div>
  );
};

export default Main;
