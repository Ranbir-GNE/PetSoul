const {
  register,
  login,
  getUserById,
  updateUser,
  deleteUser,
} = require("../Controllers/UserController");
const express = require("express");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
