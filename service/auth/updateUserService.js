const {User} = require("../../models")

const updateUserService = async (user, id) => {
	try {
		await User.update(user, {
			where: {id}
		})
		const userUpdate = await User.findOne({
			attributes: ["email", "telephone", "fullName", "status"],
			where: {id}
		})
		return userUpdate
	} catch(error) {
		return false
	}
}

module.exports = updateUserService