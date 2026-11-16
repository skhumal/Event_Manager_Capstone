const express = require("express");
const router = express.Router();


const eventController = require("../controllers/eventController");

const isAuthenticated = require("../middleware/isAuthenticated");

router.use(isAuthenticated);

// Display the create event form
router.get("/new", eventController.getNewEventForm);

// Display all events
router.get("/", eventController.getAllEvents);

// Save a new event
router.post("/", eventController.createEvent);

// Display one event
router.get("/:id", eventController.getEventById);

router.get("/:id/edit", eventController.getEditEventForm);

router.post("/:id/edit", eventController.updateEvent);  

// Delete an event
router.post("/:id/delete", eventController.deleteEvent);

module.exports = router;