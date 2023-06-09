const {
	sendOtpResetPasswordService,
	resendOtpResetPasswordService,
	verifyOtpResetPasswordService,
	resetPasswordService
} = require("../../service/auth")

module.exports = class resetPasswordController {
	static async sendOtp(req, res) {
		const otp = await sendOtpResetPasswordService(req.body.email)
		if(!otp) {
			return res.status(500).json({
				status: false,
				message: "internal server error"
			})
		}
		return res.status(201).json({
			status: true,
			message: "otp has been sent",
			expiredAt: "10 minutes"
		})
	}

	static async resendOtp(req, res) {
		const otp = await resendOtpResetPasswordService(req.body.email)
		if(!otp) {
			return res.status(500).json({
				status: false,
				message: "internal server error"
			})
		}
		return res.status(201).json({
			status: true,
			message: "otp has been resent",
			expiredAt: "10 minutes"
		})
	}

	static async verifyOtp(req, res) {
		const {email, otp} = req.body
		const isOtpVerified = await verifyOtpResetPasswordService(email, otp)
		if(!isOtpVerified) {
			return res.status(400).json({
				status: false,
				message: "invalid otp, please input valid otp"
			})
		}
		return res.status(200).json({
			status: true,
			message: "otp verified successfuly, please input new password"
		})
	}

	static async reset(req, res) {
		const {email, password} = req.body
		const isSuccesReset = await resetPasswordService(email, password)
		if(!isSuccesReset) {
			return res.status(500).json({
				status: false,
				message: "internal server error"
			})
		}
		return res.status(200).json({
			status: true,
			message: "your password has been update successfuly"
		})
	}
}