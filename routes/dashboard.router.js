const router = require("express").Router();
const { requireAuth } = require("../middlewares/auth.middleware");
const { dashboard } = require("../controllers/dashboard.controller");

router.get("/dashboard", requireAuth, dashboard);

module.exports = router;
