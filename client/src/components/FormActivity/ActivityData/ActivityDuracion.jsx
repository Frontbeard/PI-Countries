import { validateDuration } from "./validationsForActivities";
import { useState } from "react";

const activityDurationField = () => {
  const [durationValidation, setDurationValidation] = useState(false);
  const [duration, setDuration] = useState("");

  const handleDurationChange = (event) => {
    setDurationValidation(validateDuration(event.target.value));
    setDuration(event.target.value);
  };

  return (
    <div>
      <label className="labelText" htmlFor="duration">
        Duración
      </label>
      <br />
      <input
        type="text"
        value={duration}
        placeholder="Duración de la actividad (Valor numerico en horas de 1 a 5)"
        name="duration"
        onChange={handleDurationChange}
      />
    </div>
  );
};

export default activityDurationField;
