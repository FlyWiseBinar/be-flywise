const {
	otpSendService,
	otpResendService,
	otpVerifyService,
	registerService
} = require("../../service/auth")

module.exports = class registerController {
	static async register(req, res) {
		const user = await registerService(req.body)
		if (user) {
			return res.status(201).json({
				status: true,
				message: "the user has successfully registered",
				data: user
			})
		} else {
			return res.status(400).json({
				status: false,
				message: "user failed to register, enter the form correctly",
				data: {}
			})
		}
	}
	static async otpSend(req, res) {
		const { email } = req.body
		try {
			const result = await otpSendService(email)
			return res.status(200).json(result)
		} catch (error) {
			return res.status(400).json({ message: error.message })
		}
	}

	static async otpVerify(req, res) {
		const { email, otp } = req.body
		try {
			const result = await otpVerifyService(email, otp)
			return res.status(200).json(result)
		} catch (error) {
			return res.status(400).json({ message: error.message })
		}
	}

	static async otpResend(req, res) {
		const { email } = req.body
		try {
			const result = await otpResendService(email)
			return res.status(200).json(result)
		} catch (error) {
			return res.status(400).json({ message: error.message })
		}
	}
}