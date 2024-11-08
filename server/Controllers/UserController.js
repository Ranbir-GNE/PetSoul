const UserModel = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existEmail = await UserModel.findOne({ email });
  if (existEmail) {
    return res.status(400).json({ message: "Email already exist" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }
    res.status(201).json(user, { message: "User Created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const match = bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    if (!token) {
      return res.status(400).json({ message: "Token not generated" });
    }
    res.status(200).json({ token, message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.id;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const { username, firstName, lastName, address, pincode, phoneNumber } =
    req.body;
  const existUsername = await UserModel.findOne({ username });
  if (existUsername) {
    return res.status(400).json({ message: "This Username is already taken" });
  }
  try {
    const user = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        firstName,
        lastName,
        address,
        pincode,
        phoneNumber,
      },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Could Not Update User" });
    }
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.id;
  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Could Not Delete User" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
    register,
    login,
    getUserById,
    updateUser,
    deleteUser,
}
