const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "users",
    timestamps: true
});

module.exports = User;