const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Display registration form
router.get("/register", authController.getRegister);

// Process registration
router.post("/register", authController.postRegister);

// Display login form
router.get("/login", authController.getLogin);

// Process login
router.post("/login", authController.postLogin);

// log out the user
router.post("/logout", authController.logout);

module.exports = router;