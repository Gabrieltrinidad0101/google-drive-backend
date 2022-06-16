const {Router} = require("express");
const auth = require("../middlewares/auth")
const {register,comfircookie} = require("../controllers/auth/controllers.register");
const {login} = require("../controllers/auth/controllers.login")
const signOut = require("../controllers/auth/controllers.signOut")
const router = Router();


router.post("/register",register);
router.post("/login",login)
router.get("/signOut",auth,signOut)
router.get("/cookie",auth,comfircookie);

module.exports = router;