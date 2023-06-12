const { whoamiService } = require("../../service/auth")

module.exports = class whoAmIController {
  static async whoAmI(req, res) {
    const userId = req.user.id
    const data = await whoamiService(userId)

    res.status(200).json({
      status: true,
      message: "User data has been successfully retrieved",
      data: data,
    })
  }
}