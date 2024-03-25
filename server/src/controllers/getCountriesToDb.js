const axios = require("axios");
const { Country } = require("../db");

const getCountriesToDb = async (req, res) => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all"); // llamo a la url //

    for (const countryData of response.data) {
      if (
        countryData.flag &&
        countryData.flag.length > 0 &&
        countryData.capital &&
        countryData.capital.length > 0 &&
        countryData.population
      ) {
        await Country.create({
          id: countryData.cca3,
          name: countryData.name.common,
          flagImage: countryData.flags.png,
          continent: countryData.region,
          capital: countryData.capital[0],
          subregion: countryData.subregion,
          area: countryData.area,
          population: countryData.population,
        });
      }
    }

    res.status(200).json({
      Message: "Datos de países guardados correctamente en la base de datos",
    });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Error al obtener y guardar los países", error });
  }
};

module.exports = {
  getCountriesToDb,
};
