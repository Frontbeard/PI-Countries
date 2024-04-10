import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./CountryDetail.css";

const CountryDetail = () => {
  const [country, setCountry] = useState({});
  const { idPais } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/countries/${idPais}`
        );
        const data = response.data;
        if (data.name) {
          setCountry(data);
        } else {
          window.alert("No hay personajes con ese ID");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
    return () => setCountry({});
  }, [idPais]);

  return (
    <div className="detallesdelpais">
      <img src={country.flagImage && country.flagImage} alt={country.name} />
      <div>
        <h1>ID: "{country.id && country.id}"</h1>
        <h1>Nombre: "{country.name && country.name}"</h1>
        <h1>Contienente: "{country.continent && country.continent}"</h1>
        <h1>Capital: {country.capital && country.capital}</h1>
        <h1>Subregión: "{country.subregion && country.subregion}"</h1>
        <h1>Área: "{country.area && country.area}"</h1>
        <h1>Población: "{country.population && country.population}"</h1>
      </div>
    </div>
  );
};

export default CountryDetail;
