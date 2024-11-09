const { model } = require("mongoose");
const {
  createPet,
  updatePet,
  deletePet,
  getPetsByOwnerId,
  getPetDetails,
  getReports,
  getRecords,
  contact,
} = require("../Controllers/PetsController");
const express = require("express");
const router = express.Router();

router.post("/create", createPet);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);
router.get("/owner", getPetsByOwnerId);
router.get("/:id", getPetDetails);
router.get("/reports/:id", getReports);
router.get("/records/:id", getRecords);
router.get("/contact/:id", contact);

module.exports = router;
