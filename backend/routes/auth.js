const express = require("express");
const { register, login } = require("../controllers/auth");
const router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);

module.exports = router;
