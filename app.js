const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// const path = require('path');

const makerRoutes = require("./Routes/MakerRoutes");
const modelRoutes = require("./Routes/ModelRoutes");
const categoryRoutes = require("./Routes/CategoryRoutes");
const subcategoryRoutes = require("./Routes/SubcategoryRoutes");
const partRoutes = require("./Routes/PartRoutes");
const otherRoutes = require("./Routes/OtherRoutes");
const loginRoutes = require("./Routes/LoginRoutes");
const imageRoutes = require("./Routes/ImageRoutes");

const app = express(); // Inicijalizacija app

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/maker", makerRoutes);
app.use("/api/model", modelRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/part", partRoutes);
app.use("/api/other", otherRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/images", imageRoutes);
// app.use('/api/auth', userRoutes);
// app.use("/Images", express.static(path.join(__dirname, "Images")));
app.use(express.static(__dirname + "/Images"));
module.exports = app;
