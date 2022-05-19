const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

const bodyparser = require("body-parser");

if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());

//when we finally have a build file for frontend

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
  });
}

// export default express

//import all routes

// const products = require("./routes/product")

const members = require("./routes/member");
const trainer = require("./routes/trainer");
const auth = require("./routes/auth");

// app.use('/api/v1', products )
// app.use('/api/v1', auth )

app.use("/", members);

app.use("/", trainer);
app.use("/", auth);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../Frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../Frontend/build/index.html"));
  });
}

// middlewares to handle errors
// app.use(errorMiddleware)

module.exports = app;
