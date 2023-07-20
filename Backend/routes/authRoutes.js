const express = require("express");
const { signin } = require("../controllers/authControllers");
const router = express.Router();


//auth routes
router.get("/",signin);

module.exports = router;