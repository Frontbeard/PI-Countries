import { validateName } from "./validationsForActivities";
import { useState } from "react";

const activityNameField = () => {
  const [nameValidation, setNameValidation] = useState(false);
  const [name, setName] = useState("");

  const handleNameChange = (event) => {
    setNameValidation(validateName(event.target.value));
    setName(event.target.value);
  };

  return (
    <div>
      <label className="labelText" htmlFor="name">
        Nombre
      </label>
      <br />
      <input
        type="text"
        value={name}
        placeholder="Nombre de su actividad"
        name="name"
        onChange={handleNameChange}
      />
    </div>
  );
};

export default activityNameField;
