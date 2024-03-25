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

const getFiltersObject = (filters) => {
  const filtersObject = {};

  if (!filters) {
    return filtersObject;
  }

  if (!Array.isArray(filters)) {
    const [key, value] = filters.split("=");
    filtersObject[key] = value;
  } else {
    filters.forEach((filter) => {
      const [key, value] = filter.split("=");
      filtersObject[key] = value;
    });
  }

  return filtersObject;
};

async function getAllCountries(req, res) {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;
  const filters = req.query.filters || "";
  const sortBy = req.query.order || "";

  const conditions = getFiltersObject(filters);
  const sortConditions = getFiltersObject(sortBy);

  const whereClause = {};

  //verifico si conditions tiene claves definidas
  if (Object.keys(conditions).length > 0) {
    //itero sobre cada clave de dichas conditions
    Object.keys(conditions).forEach((key) => {
      if (key === "continent") {
        whereClause[key] = conditions[key];
      }
    });
  }
  try {
    const countries = await Country.findAll({
      where: whereClause, //guarda todos los filtros //
      offset: startIndex,
      limit: pageSize,
      order: Object.entries(sortConditions).map(([key, value]) => {
        if (key === "population") {
          return [literal("population"), value];
        } else if (key === "name") {
          return ["name", value];
        }
      }),
    });

    const totalRecords = await Country.count({ where: whereClause });
    const totalPages = Math.ceil(totalRecords / pageSize);

    res.status(200).json({ countries, totalPages, page });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los países" + error });
  }
}

module.exports = { getCountryById, getCountryByName, getAllCountries };
