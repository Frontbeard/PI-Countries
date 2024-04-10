const { Country, Activity } = require("../db");
const { Op, literal } = require("sequelize");

const getCountryById = async (req, res) => {
  try {
    const { idPais } = req.params;
    const country = await Country.findOne({
      where: { id: idPais },
      include: [
        {
          model: Activity,
        },
      ],
    });

    if (!country) {
      return res.status(404).json({ error: "No se encontró el país" });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el detalle del país" });
  }
};

const getCountryByName = async (req, res) => {
  try {
    const { name } = req.params;

    const countries = await Country.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (countries.length === 0) {
      return res.status(404).json({ error: "No hay coincidencias" });
    }

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los países por nombre" });
  }
};

async function getAllCountries(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const continent = req.query.continent || "";
  const sort = req.query.sort || "";
  const sortOptions = {
    alphabeticalASC: ["name", "ASC"],
    alphabeticalDESC: ["name", "DESC"],
    populationASC: ["population", "ASC"],
    populationDESC: ["population", "DESC"],
  };

  try {
    const countries = await Country.findAll({
      where: continent && { continent }, //guarda todos los filtros //
      offset: startIndex,
      limit: pageSize,
      order: sort && [sortOptions[sort]],
    });

    const totalRecords = await Country.count({
      where: continent && { continent },
    });
    const totalPages = Math.ceil(totalRecords / pageSize);

    res.status(200).json({ countries, totalPages, page });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los países" + error });
  }
}

module.exports = { getCountryById, getCountryByName, getAllCountries };
