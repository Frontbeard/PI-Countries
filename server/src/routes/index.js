const { Router } = require("express");
const { getCountriesToDb } = require("../controllers/getCountriesToDb");
const {
  getCountryById,
  getAllCountries,
  getCountryByName,
} = require("../controllers/showCountryData");
const {
  postActivity,
  getActivities,
} = require("../controllers/getPostActivities");

const router = Router();
//countries to db
router.get("/", getCountriesToDb);

//countries routes
router.get("/all", getAllCountries);
router.get("/countries/:idPais", getCountryById);
router.get("/search/:name", getCountryByName);

//activities routes
router.post("/activities", postActivity);
router.get("/activities", getActivities);

module.exports = router;
