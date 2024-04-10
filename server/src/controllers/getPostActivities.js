const { Activity, Country, conn } = require("../db");
const { Op } = require("sequelize");

const countriesNameToId = async (countries) => {
  try {
    if (!Array.isArray(countries)) {
      throw new Error("La variable 'countries' no es un arreglo.");
    }

    const countriesLowerCase = countries.map((country) =>
      country.toLowerCase()
    );

    const arrCountries = await Country.findAll({
      where: conn.where(conn.fn("lower", conn.col("name")), {
        [Op.in]: countriesLowerCase,
      }),
      attributes: ["id"],
    });

    if (arrCountries.length > 0) {
      const idArray = arrCountries.map((country) => country.dataValues.id);
      return idArray;
    }

    return null;
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error en la función countriesNameToId: ", error });
  }
};

const postActivity = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countries } = req.body;

    if (!name || !difficulty || !duration || !season || !countries) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const existingActivity = await Activity.findOne({
      where: { name: name },
    });
    if (existingActivity) {
      return res
        .status(400)
        .json({ message: "Ya existe una actividad con ese nombre" });
    }
    const countriesId = await countriesNameToId(countries);
    if (countriesId === null) {
      throw new Error("El país ingresado es inválido");
    }

    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    await newActivity.addCountries(countriesId);

    res
      .status(201)
      .json({ message: "Actividad creada exitosamente", newActivity });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la actividad turística", error });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las actividades" });
  }
};

module.exports = { postActivity, getActivities };
