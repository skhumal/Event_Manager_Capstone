require("dotenv").config();

const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const app = express();

const homeRoutes = require("./routes/homeRoutes");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const apiRoutes = require("./routes/apiRoutes");

const sequelize = require("./config/database");
const Event = require("./models/Event");
const User = require("./models/User");

// Configure EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Configure the shared EJS layout
app.use(expressLayouts);
app.set("layout", "layout");

const PORT = process.env.PORT || 3000;

// Log incoming HTTP requests
app.use(morgan("dev"));

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Serve static files such as CSS and images
app.use(express.static("public"));

// Configure user sessions
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 *60
    }
}));

// Make authentication status available to EJS views
app.use((req, res, next) => {
    res.locals.isAuthenticated = Boolean(req.session.userId);
    next();
});

app.use(express.json());

// Home route
app.use("/", homeRoutes);

// API routes
app.use("/api", apiRoutes);

// Event and authentication routes
app.use("/events", eventRoutes);
app.use("/auth", authRoutes);

// Central error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).render("error", {
        title: "Server Error",
        message: "Something went wrong. Please try again later."
    });
});

// Start the server
sequelize.sync()
    .then(() => {
        console.log("Database connected and tables created.");

        app.listen(PORT, () => {
            console.log(`Event Manager running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });