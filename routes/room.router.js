const router = require("express").Router();

const { requireAuth } = require("../middlewares/auth.middleware");
const { room, createRoom } = require("../controllers/room.controller");

router.get("/room", requireAuth, room);
router.get("/room/create-room", requireAuth, createRoom);

module.exports = router;
