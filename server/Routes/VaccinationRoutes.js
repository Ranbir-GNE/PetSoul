const {
  addVaccination,
  updateVaccination,
  viewVaccinations,
  vaccinationStatus,
  deleteVaccination,
  updateNextVaccinationDate,
  getNextVaccinationDate,
} = require("../Controllers/VaccinationController");
const express = require("express");
const router = express.Router();

router.post("/", addVaccination);
router.put("/:id", updateVaccination);
router.get("/:id", viewVaccinations);
router.get("/status/:id", vaccinationStatus);
router.delete("/:id", deleteVaccination);
router.put("/vaccination/:id", updateNextVaccinationDate);
router.get("/vaccination/:id", getNextVaccinationDate);

module.exports = router;
