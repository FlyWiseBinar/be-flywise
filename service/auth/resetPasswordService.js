const {User, Otp} = require("../../models")
const bcrypt = require("bcrypt")

const resetPasswordService = async (email, password) => {
	const user = await User.findOne({
		where: {email}
	})
	const updatePassword = await user.update({
		password: bcrypt.hashSync(password, 10)
	})
	if(!updatePassword) return false
	await Otp.destroy({
		where: {
			userId: user.id,
		}
	})
	return true
}

module.exports = resetPasswordService