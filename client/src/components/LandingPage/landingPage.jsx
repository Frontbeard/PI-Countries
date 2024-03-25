import React from "react";
import { Link } from "react-router-dom";
import "./landing.css"; // Ajusta el nombre del archivo CSS según corresponda

const Landing = () => {
  return (
    <div className="container-landing">
      <h1 className="plainText">¡Conocé el mundo con mi SPA!</h1>
      <h3>Más de 200 paises te esperan para que aprendas sobre su pobaclión y actividades disponibles</h3>
      <div className="centered-button">
        <Link to="/countries">
          <button className="btn">Ingresar</button>
        </Link>
      </div>
      <span className="reference">Frontbeard</span>
    </div>
  );
};

export default Landing;