const {body} = require("express-validator")

const resetPasswordValidation = [
	body("email").notEmpty().isEmail().withMessage("Invalid email format"),
	body("password").notEmpty().withMessage("Password cannot be empty").isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
	body("confirm_password").notEmpty().withMessage("Confirm password cannot be empty").custom((value, {req}) => {
		if(value !== req.body.password) {
			throw new Error("Passwords does not match")
		}
		return true
	}),
]

module.exports = resetPasswordValidation
