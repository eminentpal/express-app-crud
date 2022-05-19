/// this is use to check if user is authenticated or not
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const cookie = require("cookies");
//we create this cus we cant access our cookies at the client side only at backend server
// so we will be authenticating user at the backend instead of at the frontend. This is more secured way to do

exports.isAuthenticatedUser = async (req, res, next) => {
  console.log(req.headers.cookie);
  const token = req.headers.cookie?.slice(6);
  console.log({ token: token });
  if (!token) {
    return res
      .status(401)
      .json({ message: "Login first to access this resource." });
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //remember we stored d user id on the payload so we use it to find d user
    req.user = await User.findById(decoded.id);
    console.log(req.user);
  }

  next();
};
