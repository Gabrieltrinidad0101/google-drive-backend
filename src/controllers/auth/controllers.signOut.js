const filesDataBase = require("../../models/models.files");
const User = require("../../models/models.user");
const Tree = require("../../models/models.tree")
const path = require("path");
const fs = require("fs");

const signOut = async (req,res)=>{
    if(!req.user) return res.status("500").json("you need the account")
    const email = req.user.email;

    //database
    const files = await filesDataBase.find({email});

    // delete the user
    await User.findOneAndDelete({email});

    //delete files in database
    await filesDataBase.deleteMany({email});
    
    //delete the folder
    await Tree.findOneAndDelete({email});

    //delete files with fs
    files.forEach(element => {
      fs.unlinkSync(path.resolve(`src/public/uploads/${element.filename}`));
    });

    //delete cookie
    res.status(200).send("ok");
}


module.exports = signOut;

