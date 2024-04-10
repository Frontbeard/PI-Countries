import { validateDificulty } from "./validationsForActivities";
import { useState } from "react";

const activityDificultyField = () => {
  const [dificultyValidation, setDificultyValidation] = useState(false);
  const [dificulty, setDificulty] = useState("");

  const handleDificultyChange = (event) => {
    setDificultyValidation(validateDificulty(event.target.value));
    setDificulty(event.target.value);
  };

  return (
    <div>
      <label className="labelText" htmlFor="dificulty">
        Dificultad
      </label>
      <br />
      <input
        type="text"
        value={dificulty}
        placeholder="Dificultad (Valor numerico de 1 a 5)"
        name="dificulty"
        onChange={handleDificultyChange}
      />
    </div>
  );
};

export default activityDificultyField;
