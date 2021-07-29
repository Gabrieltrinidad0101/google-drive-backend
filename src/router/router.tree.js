///// module /////////

const {Router} = require("express");
const {saveTree,getTree,comfircookie} = require("../controllers/tree/controllers.tree");
const auth = require("../middlewares/auth")
const router = Router();


//router
router.post("/save",auth,saveTree);
router.get("/get",auth,getTree);

module.exports = router;