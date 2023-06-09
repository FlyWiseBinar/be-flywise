const checkActiveUserService = require("./checkActiveUserService")
const loginService = require("./loginService")
const sendOtpResetPasswordService = require("./sendOtpResetPasswordService")
const resendOtpResetPasswordService = require("./resendOtpResetPasswordService")
const verifyOtpResetPasswordService = require("./verifyOtpResetPasswordService")
const updateUserService = require("./updateUserService")
const resetPasswordService = require("./resetPasswordService")
const otpSendService = require("./otpSendService")
const otpResendService = require("./otpResendService")
const otpVerifyService = require("./otpVerifyService")
const registerService = require("./registerService")

module.exports = {
	checkActiveUserService,
	loginService,
	sendOtpResetPasswordService,
	resendOtpResetPasswordService,
	verifyOtpResetPasswordService,
	updateUserService,
	resetPasswordService,
	otpSendService,
	otpResendService,
	otpVerifyService,
	registerService
}