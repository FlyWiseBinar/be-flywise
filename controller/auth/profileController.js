const {updateUserService} = require("../../service/auth")
const {User} = require("../../models")
const jwt = require("jsonwebtoken")

module.exports = class profileController {
	static async update(req, res) {
		const {fullName, telephone, email} = req.body
		const authheader = req.header("Authorization")
		const tokenUser = authheader && authheader.split(" ")[1]
		const decoded = jwt.decode(tokenUser, process.env.JWT_SECRET_KEY)

		const isExistUser = await User.findOne({
			where: {email}
		})
		console.log(isExistUser)

		const isEmailChange = decoded.email != email
		if(isExistUser && isEmailChange) {
			return res.status(400).json({
				errors: [
					{
						message: "Email already exist, please input different email",
						field: "email"
					}
				]
			})
		}
		const userUpdate = await updateUserService(req.body, tokenUser)
		if(!userUpdate) {
			return res.status(500).json({
				status: false,
				message: "internal server error",
			})
		}
		return res.status(200).json({
			status: true,
			message: "user has been update successfuly",
			data: userUpdate
		})
	}
}