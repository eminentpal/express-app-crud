const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.connectDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then((con) => {
      console.log(
        `MongoDB Database connected with Host: ${con.connection.host}  `
      );
    });
};

module.exports = connectDatabase;
