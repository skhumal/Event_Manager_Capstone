const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");

// Display the registration form 
exports.getRegister = (req, res) => {
    res.render("auth/register", {
            title: "Create Account"
        });
    };

    // Display the login form 
    exports.getLogin = (req, res) => {
        res.render("auth/login", {
            title: "Login"
        });
    };

    // Register a new user
    exports.postRegister = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            // Validate password length on the server
if (typeof password !== "string" || password.length < 8) {
    return res.status(400).render("auth/register", {
        title: "Create Account",
        error: "Password must be at least 8 characters long."
    });
}

            // Check if the email is already registered
            const existingUser = await userRepository.findByEmail(email);

            if(existingUser) {
                return res.status(409).render("auth/register", {
                    title: "Create Account",
                    error: "This email is already registered."
                });
            }

            // Hash the password
            const passwordHash = await bcrypt.hash(password, 12);

            // Save the new user
            await userRepository.create({
                name,
                email,
                passwordHash
            });

            res.redirect("/auth/login");
        } catch(error) {
            next(error);
        }
    }

    // Process user login
    exports.postLogin = async (req, res, next) => {
        try{
            const {email, password} = req.body;

            // Find the user by email
            const user = await userRepository.findByEmail(email);

            if(!user) {
                return res.status(401).render("auth/login", {
                    title: "Login",
                    error: "Invalid email or password."
                });
            }

            //Compare entered password with stored hash
            const passwordMatch = await bcrypt.compare(
                password,
                user.passwordHash
            );

            if (!passwordMatch) {
                return res.status(401).render("auth/login", {
                    title: "Login",
                    error: "Invalid email or password."
                });
            }

            // Login successful
            req.session.userId = user.userId;

            res.redirect("/");
        } catch (error) {
            next(error);
        }
    };

    // Log out the user
    exports.logout = (req, res, next) => {
        req.session.destroy((error) => {
            if(error) {
                return next(error);
            }

            res.redirect("/auth/login")
        });
    };