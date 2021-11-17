const router = require("express").Router();

const {
  register,
  login,
  viewLogin,
  viewRegister,
  logout,
} = require("../controllers/user.controller");
const { validate } = require("../middlewares/validate.middleware");
const { registerSchema } = require("../schema/register.schema");
const { loginSchema } = require("../schema/login.schema");

// GET
router.get("/register", viewRegister);
router.get("/login", viewLogin);
router.get("/logout", logout);

// POST
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
