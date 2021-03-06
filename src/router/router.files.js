//modules
const {Router} = require("express");
const {saveFile,
    getFiles,
    deleteFiles,
    deleteFile,
    checkPublic,
    publicFile,
    newName,
    saveDocument,
    readDocument,
    filterFiles,
    checkIfTheIsPublic} = require("../controllers/file/files");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer")
const router = Router();

router.use(multer.single("file"));


//routers
router.get("/uploads/:fileName",auth,checkPublic);
router.post("/saveFile",auth,saveFile);
router.post("/getFiles",auth,getFiles);
router.post("/publicFile",auth,publicFile);
router.post("/newName",auth,newName);
router.post("/checkIfTheIsPublic",auth,checkIfTheIsPublic);
router.post("/saveDocument",auth,saveDocument);
router.post("/readDocument",auth,readDocument);
router.post("/filterFiles",auth,filterFiles);
router.delete("/deleteFiles",auth,deleteFiles);
router.delete("/deleteFile",auth,deleteFile);


 
//exports
module.exports = router;