const {Router} = require("express");
const {saveTree,getTree} = require("../controllers/tree/controllers.tree");
const auth = require("../middlewares/auth")
const router = Router();

router.post("/save",auth,saveTree);
router.get("/get",auth,getTree);
module.exports = router;