const { Router } = require("express");
const router = Router();

const { whoAmIController } = require("../controller/auth");

const { authMiddleware } = require("../middleware");

router.get("auth/whoami", authMiddleware, whoAmIController.whoAmI);

module.exports = router;
