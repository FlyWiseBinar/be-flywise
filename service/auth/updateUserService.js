const {User} = require("../../models")
const jwt = require("jsonwebtoken")

const updateUserService = async (user, credentials) => {
	try {
		const decoded = jwt.decode(credentials, process.env.JWT_SECRET_KEY)
		await User.update(user, {
			where: {id: decoded.userId}
		})
		const isEmailChange = decoded.email != user.email
		if(isEmailChange) {
			await User.update({
				id: decoded.userId,
				status: false
			}, {
				where: {id: decoded.userId}
			})
		}
		const userUpdate = await User.findOne({
			attributes: ["email", "telephone", "fullName", "status"],
			where: {id: decoded.userId}
		})
		return userUpdate
	} catch(error) {
		console.log(error)
		return false
	}
}

module.exports = updateUserService