const {checkActiveUserService} = require("../service/auth")

const activeUserMiddleware = async (req, res, next) => {
	const isActiveUser = await checkActiveUserService(req.body.email)
	if(!isActiveUser) {
		return res.status(403).json({
			status: false,
			message: "Your account has not been verified, please verify now"
		})
	}
	next()
}

module.exports = activeUserMiddleware