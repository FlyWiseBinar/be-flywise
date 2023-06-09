const {body} = require("express-validator")
const {User} = require("../models")
const jwt = require("jsonwebtoken")

const updateProfileValidation = [
	body("fullName").notEmpty().withMessage("Name cannot be empty"),
	body("telephone").notEmpty().withMessage("telephone cannot be empty"),
	body("email").notEmpty().withMessage("Email cannot be empty").isEmail().withMessage("Invalid email format")
]

module.exports = updateProfileValidation
