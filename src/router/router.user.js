const {Router} = require("express");
const {register,comfirEmail,comfircookie} = require("../controllers/auth/controllers.register");
const {login} = require("../controllers/auth/controllers.login")
const signOut = require("../controllers/auth/controllers.signOut")

const auth = require("../middlewares/auth")
const router = Router();

router.post("/register",register);
router.post("/login",login)
router.get("/comfir/:token",comfirEmail);
router.get("/cookie",auth,comfircookie);
router.get("/signOut",auth,signOut)
module.exports = router;