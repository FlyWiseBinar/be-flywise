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

const registerValidation = [
	body("fullName").notEmpty().withMessage("Name cannot be empty"),
	body("email").notEmpty().isEmail().withMessage("Invalid email format").custom(emailValidator),
	body("telephone").notEmpty().matches(/^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/).withMessage("Invalid telephone format"),
	body("password").notEmpty().withMessage("Password cannot be empty").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
]

module.exports = registerValidation
