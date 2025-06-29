const express = require("express");
require("dotenv").config();
const cors = require("cors");

const dbConnect = require("./utils/dbConnect");

const userRoutes = require("./Routes/UserRoutes");
const healthRecordRoutes = require("./Routes/HealthRecordsRoutes");
const reportRoutes = require("./Routes/ReportRoutes");
const petRoutes = require("./Routes/PetsRoutes");
const vaccinationRoutes = require("./Routes/VaccinationRoutes");
const orderRoutes = require("./Routes/OrderRoutes");
const adminOrderRoutes = require("./Routes/AdminOrdersRoutes");
const productRoutes = require("./Routes/ProductRoutes");

const { authMiddleware, isAdmin } = require("./middleware/authMiddleware");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(cors());

app
  .listen(process.env.PORT, () => {
    console.log(`server is working on Port:${process.env.PORT}`);
  })
  .on("error", (error) => {
    console.error(error);
  });
app.use("/api/users", loggerMiddleware, userRoutes);
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
app.use("/api/orders", loggerMiddleware, authMiddleware, orderRoutes);
app.use(
  "/api/admin/orders",
  loggerMiddleware,
  authMiddleware,
  isAdmin,
  adminOrderRoutes
);
app.use("/api/products", loggerMiddleware, authMiddleware, productRoutes);
app.use(
  "/api/admin/products",
  loggerMiddleware,
  authMiddleware,
  isAdmin,
  productRoutes
);


