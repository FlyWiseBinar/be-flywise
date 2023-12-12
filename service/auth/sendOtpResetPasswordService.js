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
		html: `
				<div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
					<h2>Reset Password FlyWise Account.</h2>
					<h4>One more step to reset your password ✔</h4>
					<p style="margin-bottom: 30px;">Please enter the OTP to reset password your account</p>
					<h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
					<p style="margin-top:50px;">If you do not request for verification please do not respond to the mail.</p>
				</div> 
  			`
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