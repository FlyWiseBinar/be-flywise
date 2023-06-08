const {loginService} = require("../../service/auth")
const jwt = require("jsonwebtoken")

module.exports = class loginController {
	static async login(req, res) {
		const {email, password} = req.body
		const user = await loginService(email, password)
		if(!user) {
			return res.status(400).json({
				status: false,
				message: "your password is wrong"
			})
		}
		const accessToken = jwt.sign({
			userId: user.id,
			name: user.fullName,
			email: user.email,
		}, process.env.JWT_SECRET_KEY, {
			expiresIn: '10d'
		})
		return res.status(200).json({
			status: true,
			accessToken,
			expiredAt: "10 days"
		})
	}
}