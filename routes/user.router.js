const router = require("express").Router();

const { register, login } = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const { registerSchema } = require("../schema/register.schema");

router.post("/register", validate(registerSchema), register);
router.post("/login", login);

module.exports = router;
