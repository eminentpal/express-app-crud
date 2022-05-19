const bcrypt = require("bcryptjs");
const User = require("../models/user");
const sendToken = require("../utils/sendToken");

exports.login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.pass;
  console.log(password);
  try {
    if (!email || !password) {
      return res.status(422).json({ message: "All fields requred" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(422)
        .json({ email: "User does not exist with that email" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    console.log("h");
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(422).json({ message: "All fields requred" });
    }
    const emailFound = await User.findOne({ email });

    console.log(emailFound);
    if (emailFound) {
      return res.status(422).json({ email: "User exist with that email" });
    }
    if (password.length < 6) {
      return res
        .status(422)
        .json({ message: "Your Password must be longer than 6 characters" });
    }

    const cryptPassword = await bcrypt.hash(password, 10);

    console.log(cryptPassword);
    const user = await User.create({
      name,
      email,
      password: cryptPassword,
    });

    sendToken(user, 201, res);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
