const filesDataBase = require("../../models/models.files");
const fs = require("fs");
const {server} = require("../../urls")
const { v4: uuidv4 } = require('uuid');
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
            path: `${server}/uploads/${filename}`,
            folder,
            email: req.user.email,
            filename,
            mimetype,
        });
        await newFile.save();
        res.status(200).json([newFile]);
    } catch (error) {
        res.status(500).json(error)
    }
}


//save document
files.saveDocument = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {folder,Data,filename} = req.body;
        if (filename){
            const pathFile = path.resolve(`src/public/uploads/${filename}`)
            fs.writeFile(pathFile,Data,(error)=>{
                if(error){
                    return res.status(500).json(error)
                }
            });
            return res.status(200).json("ok")
        }

        id = uuidv4()
        fs.writeFile(path.resolve(`src/public/uploads/${id + ".html"}`),Data, async error=>{
            if(error)
                res.status(501).json("error")
                return
        })
        const newFile = new filesDataBase({
            name: 'undefined.html',
            path: `${server}/uploads/${id}`,
            folder,
            email: req.user.email,
            filename: id + '.html',
            mimetype: 'application/html',
        });
        await newFile.save();
        res.status(200).json(newFile.filename)
    } catch (error) {
        res.status(500).json(error)
    }
}

//read document
files.readDocument = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {filename} = req.body
        const pathFile = path.resolve(`src/public/uploads/${filename}`)
        fs.readFile(pathFile, 'utf8' , (err, Data) => {
            if (err) {
                res.status(500).json("error")
                return
            }
            return res.status(200).json(Data)
        })
    } catch (error) {
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

//delete files
files.deleteFiles = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {Folders} = req.body;
        Folders.forEach(async folder =>{
            const files = await filesDataBase.find({folder})
            await filesDataBase.deleteMany({folder})
            files.forEach(file=>{
                fs.unlinkSync(path.resolve(`src/public/uploads/${file.filename}`));
            })
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

//check if the is public
files.checkIfTheIsPublic = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {filename} = req.body;
        const getInfo = await filesDataBase.findOne({filename, email: req.user.email},{public: 1});
        res.status(200).json(getInfo);
    } catch (error) {
        res.status(500).json("error")
    }
}


//search files
files.filterFiles = async (req,res)=>{
    try {
        const name = req.body.name
        const files = await filesDataBase.find({
            $text: {
                $search: "\"" + name + "\""
            }
        });
        res.status(200).json(files);
    } catch (error) {
        console.log(error)
        res.status(500).json("error")
    }
}

module.exports = files;