const {User, Otp} = require("../../models")
const {Op} = require("sequelize")

const verifyOtpResetPasswordService = async (email, otp) => {
	const user = await User.findOne({
		where: {email}
	})
	const isValidOtp = await Otp.findOne({
		where: {
			userId: user.id,
			expiredAt: {
				[Op.gt]: Date.now()
			},
			otp
		}
	})
	if(!isValidOtp) return false
	return true
}

module.exports = verifyOtpResetPasswordService