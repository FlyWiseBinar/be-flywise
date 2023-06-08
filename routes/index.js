const {Router} = require("express")
const router = Router()

const alvin = require("./alvin")
const yoga = require("./yoga")
const faisal = require("./faisal")
const danu = require("./danu")

router.get("/", (req, res) => {
	return res.status(200).json({
		status: true,
		message: "server running"
	})
})

router.use("/v1/api", alvin)
router.use("/v1/api", yoga)
router.use("/v1/api", faisal)
router.use("/v1/api", danu)

router.use("/", (req, res) => {
	return res.status(400).json({
		status: false,
		message: "endpoint not found"
	})
})

module.exports = router