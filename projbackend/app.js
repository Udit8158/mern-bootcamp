// Importing packages
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config(); // for env variable
const authRoutes = require("./routes/auth");

// Defining port with env variable
const port = process.env.PORT || 8000;

// Include other middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Uses middle ware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// connect db
mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected with DB");
  });

// Routes
app.use("/api", authRoutes);

// Listen on the port
app.listen(port, () => {
  console.log(`App is running at ${port}`);
});
