const { whoamiService } = require("../../service/auth")
const { User } = require("../../models")

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

  static async delete(req,res) {
    const {email} = req.body

    await User.destroy({
      where : {
        email : email
      }
    })

    res.status(200).json({
      msg: `User ${email} has been deleted`
    })
  }
}