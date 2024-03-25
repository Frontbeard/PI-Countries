import { Link, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const Navbar = ({ setSearchResults }) => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  if (isHome) {
    return null;
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/countries">
            <button className="btnBar">Home</button>
          </Link>
        </li>
        <li>
          <Link to="/countries/activities">
            <button className="btnBar">Crear actividad</button>
          </Link>
        </li>
        <li>
          <Link to="/countries/activities/show">
            <button className="btnBar">Mostrar actividades</button>
          </Link>
        </li>
        <li>
          <SearchBar setSearchResults={setSearchResults} />
        </li>
        <li>
          <Link to="/">
            <button className="btnBar">Log Out</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
