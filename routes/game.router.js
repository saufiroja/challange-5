const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth.middleware");
const { game } = require("../controllers/game.controller");

router.get("/game", requireAuth, game);

module.exports = router;
