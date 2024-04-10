import { useState } from "react";
import axios from "axios";
import "./SearchBar.css";

const SearchBar = ({ setSearchResults }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const onSearch = async (name) => {
    try {
      if (name === "") {
        setSearchResults([]);
      } else {
        const response = await axios.get(
          `http://localhost:3001/search/${name}`
        );
        const country = response.data;
        setSearchResults(country);
      }
    } catch (error) {
      console.error("Error al buscar el país:", error);
      alert("Error al buscar el país");
    }
  };

  return (
    <div className="search-bar">
      <input
        className="inputSearchBar"
        type="search"
        value={name}
        onChange={handleChange}
        placeholder="Ingrese un país"
      />
      <button className="btnBar" onClick={() => onSearch(name)}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
