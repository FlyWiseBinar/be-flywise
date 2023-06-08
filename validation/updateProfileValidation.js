const {body} = require("express-validator")
const {User} = require("../models")

const emailValidator = async (email) => {
	const user = await User.findOne({
		where: {email}
	})
	if(user) {
		return Promise.reject("Email already in use, please input different email")
	}
}
const updateProfileValidation = [
	body("fullName").notEmpty().withMessage("Name cannot be empty"),
	body("telephone").notEmpty().withMessage("Password cannot be empty"),
	body("email").notEmpty().isEmail().withMessage("Invalid email format").custom(emailValidator),
]

module.exports = updateProfileValidation
