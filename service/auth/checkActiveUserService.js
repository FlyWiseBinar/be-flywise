const {User} = require("../../models")

const checkActiveUserService = async (email) => {
	const user = await User.findOne({
		where: {
			email,
			status: true
		}
	})
	if(!user) return false
	return true
}

module.exports = checkActiveUserService