const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

// Return all events as JSON
router.get("/events", apiController.getAllEvents);

module.exports = router;