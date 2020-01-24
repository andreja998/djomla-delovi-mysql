const express = require("express");
const router = express.Router();

const loginController = require("../Controllers/LogintControler");

router.post("/", loginController.login);

module.exports = router;
