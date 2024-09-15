// Order of imports is important
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const relations = require("./src/models/index");
const sequelize = require("./src/config/db");

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests only from this origin
  })
);

app.use(bodyParser.json());

const authRoutes = require("./src/routes/authRoutes");
const dayRoutes = require("./src/routes/dayRoutes");
const calendarRoutes = require("./src/routes/calendarRoutes");
const holidayRoutes = require("./src/routes/holidayRoutes");

app.use("/", authRoutes);
app.use("/", dayRoutes);
app.use("/", calendarRoutes);
app.use("/", holidayRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 7050;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
