const {User} = require("../../models")
const bcrypt = require("bcrypt")

const registerService = async (user) => {
	try {
		const salt = bcrypt.genSaltSync(10)
		const hashPassword = bcrypt.hashSync(user.password, salt)
		const response = await User.create({
			fullName: user.fullName,
			email: user.email,
			telephone: user.telephone,
			password: hashPassword,
			status: false
		})
		return response

	} catch(error) {
		console.log(error)
		return false
	}
}

module.exports = registerService

