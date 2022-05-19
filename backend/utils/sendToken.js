const jwt = require("jsonwebtoken");
// import cookie from "cookie";
const cookie = require("cookie");

const sendToken = (user, statusCode, res) => {
  //create jwt Token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  console.log(token);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: "/",
    })
  );

  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

// export default sendToken;

module.exports = sendToken;
