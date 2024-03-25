import "./App.css";
import Cards from "./components/Cards/Cards";
import NavBar from "./components/NavBar/NavBar";
import CountryDetail from "./components/CountryDetail/CountryDetail";
import FormActivity from "./components/FormActivity/FormActivity";
import ShowActivities from "./components/ShowActivities/ShowActivities";
import LandingPage from "./components/LandingPage/landingPage";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="App">
      <NavBar setSearchResults={setSearchResults} />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route
          path="/countries"
          element={<Cards searchResults={searchResults} />}
        />
        <Route path="/countries/activities" element={<FormActivity />} />
        <Route path="/countries/activities/show" element={<ShowActivities />} />
        <Route path="/countries/detail/:idPais" element={<CountryDetail />} />
      </Routes>
    </div>
  );
}

export default App;
