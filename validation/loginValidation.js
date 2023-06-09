const {body} = require("express-validator")
const {User} = require("../models")

const emailValidator = async (email) => {
	const user = await User.findOne({
		where: {email}
	})
	if(!user) return Promise.reject("Email not found")
}

const loginValidation = [
	body("email").notEmpty().isEmail().withMessage("Invalid email format").custom(emailValidator),
	body("password").notEmpty().withMessage("Password cannot be empty").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
]

module.exports = loginValidation
