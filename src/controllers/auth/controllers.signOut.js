const filesDataBase = require("../../models/models.files");
const User = require("../../models/models.user");
const Tree = require("../../models/models.tree")
const path = require("path");
const fs = require("fs");

const signOut = async (req,res)=>{
    const email = req.user.email;

    //database
    const files = await filesDataBase.find({email});
    await User.findOneAndDelete({email});
    await filesDataBase.deleteMany({email});
    await Tree.findOneAndDelete({email});

    //delete files with fs
    files.forEach(element => {
      fs.unlinkSync(path.resolve(`src/public/uploads/${element.filename}`));
    });

    //delete cookie
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
}


module.exports = signOut;

