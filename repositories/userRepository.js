const User = require("../models/User");

const userRepository = {
    // Find a user by email
    findByEmail(email) {
        return User.findOne({
            where: { email }
        });
    },

    // Find a user by ID
    findById(id){
        return User.findByPk(id);
    },

    // Register a new user
    create(userData){
        return User.create(userData);
    }
};

module.exports = userRepository;