const express = require("express");
//router check authorization của user
const router = express.Router();
const checkAuth = require("../controllers/checkAuth");
router.use("/", checkAuth);
module.exports = router;
