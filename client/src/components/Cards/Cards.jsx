import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getCountries,
} from "../../redux/actions";
import "./Cards.css";

const Cards = ({ searchResults }) => {
  const [continent, setContinent] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const { countries, totalPages} = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const handleFilter = (event) => {
    setContinent(event.target.value);
    setPage(1)
  };
  const handleSort = (event) => {
    setSort(event.target.value);
    setPage(1)
  };
  const renderPaginationButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      <button
        key={"<"}
        onClick={() => setPage(page - 1)}
        disabled={page == 1}
      >
        {"<"}
      </button>
    );
    let start = Math.max(Math.min(page - 3, totalPages - 5), 1);
    for (let i = start; i <= Math.min(start + 5, totalPages); i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          disabled={i === page}
        >
          {i}
        </button>
      );
    }
    pageButtons.push(
      <button
        key={">"}
        onClick={() => setPage(page + 1)}
        disabled={page == totalPages}
      >
        {">"}
      </button>
    );
    return pageButtons;
  };

  useEffect(() => {
    dispatch(getCountries(page, continent, sort));
  }, [dispatch, page, continent, sort]);

  const displayCountries =
    searchResults.length > 0 ? searchResults : countries;
  return (
    <div className="bajandolo">
      <h1 className="solouno">Main</h1>
      <label className="filterSelect" htmlFor="continentSelector">
        Elegir Continente:{" "}
      </label>
      <select onChange={handleFilter}>
        <option value="">Mostrar todo</option>
        <option value="Europe">Europa</option>
        <option value="Oceania">Oceania</option>
        <option value="Americas">America</option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="Antarctic">Antártida</option>
      </select>
      <label className="filterSelect" htmlFor="orderSelector">
        Ordenar:
      </label>
      <select onChange={handleSort}>
        <option value="">Mostrar todo</option>
        <option value="alphabeticalASC">Alfabético Ascendente</option>
        <option value="alphabeticalDESC">Alfabético Descendente</option>
        <option value="populationASC">Población Ascendente</option>
        <option value="populationDESC">Población Descendente</option>
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
      <div className="pagination">{renderPaginationButtons()}</div>
    </div>
  );
};

export default Cards;
