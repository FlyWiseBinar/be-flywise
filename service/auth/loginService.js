const {User} = require("../../models")
const bcrypt = require("bcrypt")

const loginService = async (email, password) => {
	const user = await User.findOne({
		where: {email}
	})
	const isMatchPassword = bcrypt.compareSync(password, user.password)
	if(!isMatchPassword) return false
	return user
}

module.exports = loginService