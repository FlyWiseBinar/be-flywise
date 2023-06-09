const {User, Otp} = require("../../models")


const otpVerifyService = async (email, otp) => {
	const newUser = await User.findOne({where: {email: email}})

	if(!newUser) {
		throw new Error("User does not exist")
	}

	if(newUser.status === true) {
		throw new Error("User already verified")
	}

	const existingOTP = await Otp.findOne({
		where: {otp}
	})

	if(!existingOTP) {
		throw new Error("Invalid OTP")
	}

	if(newUser.id !== existingOTP.userId) {
		throw new Error("User and otp do not match")
	}

	if(existingOTP.expiredAt < new Date()) {
		throw new Error("OTP has expired")
	}

	const deleteOtp = await existingOTP.destroy()
	const updateStatusUser = await newUser.update({status: true})

	if(deleteOtp && updateStatusUser) {
		return ({message: "OTP verified successfully"})
	}

	return false

}
module.exports = otpVerifyService