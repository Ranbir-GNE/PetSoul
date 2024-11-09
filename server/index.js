const express = require("express");
require("dotenv").config();

const dbConnect = require("./utils/dbConnect.cjs");

const userRoutes = require("./Routes/UserRoutes");
const healthRecordRoutes = require("./Routes/HealthRecordsRoutes");
const reportRoutes = require("./Routes/ReportRoutes");
const petRoutes = require("./Routes/PetRoutes");
const vaccinationRoutes = require("./Routes/VaccinationRoutes");

const authMiddleware = require("./Middleware/authMiddleware");
const logger = require("./Middleware/logger");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app
  .listen(process.env.PORT, () => {
    console.log(`server is working on Port:${process.env.PORT}`);
  })
  .catch(console.log("failed to connect to server"));

app.use("/api/users", loggerMiddleware, userRoutes);
app.use(
  "/api/healthRecords",
  loggerMiddleware,
  authMiddleware,
  healthRecordRoutes
);
app.use(
  "/api/healthRecords",
  loggerMiddleware,
  authMiddleware,
  healthRecordRoutes
);
app.use("/api/reports", loggerMiddleware, authMiddleware, reportRoutes);
app.use("/api/pets", loggerMiddleware, authMiddleware, petRoutes);
app.use(
  "/api/vaccinations",
  loggerMiddleware,
  authMiddleware,
  vaccinationRoutes
);
