const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");

// Homepage route
router.get("/", homeController.getHome);

module.exports = router;