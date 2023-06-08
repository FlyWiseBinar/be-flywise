const guestMiddleware = async (req, res, next) => {
	const authheader = req.header("Authorization")
	const tokenUser = authheader && authheader.split(" ")[1]
	if(tokenUser) {
		return res.status(400).json({
			error: {
				name: "forbidden access",
				message: "please logout to continue access resource"
			}
		})
	}
	next()
}

module.exports = guestMiddleware