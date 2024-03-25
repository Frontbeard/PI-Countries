import { getActivities } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import "./ShowActivities.css";

const showActivities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  console.log(activities);
  return (
    <div className="activities-container">
      <h2>Actividades</h2>
      {Array.isArray(activities) && activities.length > 0 ? (
        activities.map((activity) => (
          <div key={activity.id}>
            <h3>Nombre: {activity.name}</h3>
            <p>Duración: {activity.duration}</p>
            <p>Dificultad: {activity.difficulty}</p>
            <p>Temporada: {activity.season}</p>
            <p>
              Países:{" "}
              {activity.Countries.map((country, index) => (
                <span key={country.id}>
                  {country.name} ({country.id})
                  {index !== activity.Countries.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
        ))
      ) : (
        <p>No se encontraron actividades</p>
      )}
    </div>
  );
};

export default showActivities;
