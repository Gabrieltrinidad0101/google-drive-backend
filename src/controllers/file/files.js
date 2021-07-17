const filesDataBase = require("../../models/models.files");
const fs = require("fs");
const {server} = require("../../urls")
const path = require("path");
const files = {};

//save files
files.saveFile = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {originalname,filename,mimetype} = req.file;
        const {folder} = req.body;
        const newFile = new filesDataBase({
            name: originalname,
            path: `${server}uploads/${filename}`,
            folder,
            email: req.user.email,
            filename,
            mimetype,
        });
        await newFile.save();
        res.status(200).json([newFile]);
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


//get Files
files.getFiles = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {folder} = req.body;
        const files = await filesDataBase.find({email: req.user.email,folder})
        res.json(files);
    } catch (error) {
        res.status(500).json(error)
    }
}

//verification if the file is public
/* files.verificationFiles = async(req,res)=>{
    try {
        const public = await filesDataBase.findOne({filename: req.params.fileName},{public: 1,_id:0});
        if(public) return
        if(!req.user) return res.status(404).json("error");
    } catch (error) {
        res.status(500).json(error)
    }
} */

//delete files
files.deleteFiles = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {Folders} = req.body;
        Folders.forEach(async folder =>{
            const file = await filesDataBase.findOneAndDelete({folder})
            if(file){
                const filename = file.filename;
                fs.unlinkSync(path.resolve(`src/public/uploads/${filename}`));
            } 
        })
        res.json("ok")
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete file
files.deleteFile = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {filename} = req.body;
        const file = await filesDataBase.findOneAndDelete({filename,email: req.user.email})
        if(file){
            fs.unlinkSync(path.resolve(`src/public/uploads/${filename}`));
        }
        res.json("ok");
    } catch (error) {
        res.status(500).json(error)
    }
}

//Check if the file is public
files.checkPublic = async (req,res)=>{
    try {
        const filename = req.params.fileName;
        const {public} = await filesDataBase.findOne({filename});
        if(public){
            return res.sendFile(path.resolve(`src/public/uploads/${filename}`))
        }
        const user = await filesDataBase.findOne({email: req.user.email,filename});
        if(!user) return res.status(404).json("error");
        return res.sendFile(path.resolve(`src/public/uploads/${filename}`))
    } catch (error) {
        res.status(404).json("error")
    }
}

//public file
files.publicFile = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {filename,boolean} = req.body;
        await filesDataBase.findOneAndUpdate({filename,email: req.user.email},{public: boolean});
        res.status(200).json("ok");
    } catch (error) {
        res.status(500).json("error");
    }
}

files.newName = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {filename,newName} = req.body;
        await filesDataBase.findOneAndUpdate({filename, email: req.user.email},{name: newName});
        res.status(200).json("ok");
    } catch (error) {
        res.status(500).json("error")
    }
}

module.exports = files;