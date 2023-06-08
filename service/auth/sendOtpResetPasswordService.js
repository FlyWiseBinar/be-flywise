const nodemailer = require("nodemailer")
const otpGenerator = require("otp-generator")
const {User, Otp} = require("../../models")

const otp = otpGenerator.generate(6, {
	upperCaseAlphabets: false,
	specialChars: false,
	lowerCaseAlphabets: false,
})

const sendMail = async (to) => {
	let status = false
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "flywisebinar@gmail.com",
			pass: "cydlcwdwtbudltdv",
		},
		tls: {
			rejectUnauthorized: false,
		},
	})

	const mailOptions = {
		from: "flywisebinar@gmail.com",
		to,
		subject: "FlyWise",
		html: `kode otp kamu adalah<b> ${otp}</b>, gunakan untuk mereset password`
	}

	try {
		transporter.sendMail(mailOptions).then(res => status = true)
	} catch(error) {
		console.log(error)
		status = false
	}
	return status
}

const sendOtpResetPasswordService = async (email) => {
	const user = await User.findOne({
		where: {email}
	})
	const isEmailSent = sendMail(email)
	if(!isEmailSent) return false
	const createOtp = await Otp.create({
		userId: user.id,
		otp,
		expiredAt: Date.now() + 1000 * 60 * 10
	})
	if(!createOtp) return false
	console.log("send otp:", otp)
	return otp
}
module.exports = sendOtpResetPasswordService