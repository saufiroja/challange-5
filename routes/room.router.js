const router = require("express").Router();

const { requireAuth } = require("../middlewares/auth.middleware");
const { room } = require("../controllers/room.controller");

router.get("/room", requireAuth, room);

module.exports = router;
