const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://P_Gym:admin123@cluster0.nwaqj.mongodb.net/expressappDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      }
    )
    .then((con) => {
      console.log(
        `MongoDB Database connected with Host: ${con.connection.host}  `
      );
    });
};

module.exports = connectDatabase;
