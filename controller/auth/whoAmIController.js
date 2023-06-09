const { whoamiService } = require("../../service/auth");

module.exports = class whoAmIController {
  static async whoAmI(req, res) {
    const authHeader = req.header("Authorization");
    const tokenUser = authHeader.split(" ")[1];

    const decoded = jwt.verify(tokenUser, process.env.JWT_SECRET_TOKEN);
    const userId = decoded.userId;
    const data = whoamiService(userId);

    res.status(200).json({
      status: true,
      message: "User data has been successfully retrieved",
      data: data,
    });
  }
};
