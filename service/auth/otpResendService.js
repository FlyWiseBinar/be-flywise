const {User, Otp} = require("../../models")

const otpGenerator = require("otp-generator")
const nodemailer = require("nodemailer")

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

const otpResendService = async (email) => {
	const OTP = otpGenerator.generate(6, {upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true})
	const existingUser = await User.findOne({where: {email: email}})

	if(!existingUser) {
		throw new Error("User does not exist")
	}

	if(existingUser.status === true) {
		throw new Error("User already verified")
	}

	if(existingUser) {
		await Otp.create({
			otp: OTP,
			expiredAt: Date.now() + 1000 * 60 * 10,
			userId: existingUser.id
		}).then(() => {
			const mailOptions = {
				from: "flywisebinar@gmail.com",
				to: email,
				subject: "OTP Verification FlyWise",
				html: `
                                    <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
                                        <h2>Welcome to FlyWise.</h2>
                                        <h4>You are officially member ✔</h4>
                                        <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
                                        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
                                        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail.</p>
                                    </div> `,
			}

			transporter.sendMail(mailOptions, function(err, info) {
				if(err) {
					console.log(err)
				} else {
					console.log("Email terkirim: " + info.response)
				}
			})
		})

		return ({message: "Otp sent successfully"})

	}

	return false

}
module.exports = otpResendService