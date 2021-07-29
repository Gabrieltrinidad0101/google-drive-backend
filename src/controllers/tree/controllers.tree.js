const treeDataBase = require("../../models/models.tree");

const Tree = {};


Tree.saveTree = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const {tree} = req.body;
        const strTree = JSON.stringify(tree);
        
        const data = await treeDataBase.findOne({email: req.user.email})
        if(data){
            await treeDataBase.findOneAndUpdate({email: req.user.email},{tree: strTree})
            return res.status(200).json("upload")
        }
    
        const newTree = new treeDataBase({
            tree: strTree,
            email: req.user.email
        });
        
        const saveTree = await newTree.save();
        const getTree = JSON.parse(saveTree.tree);
        res.status(200).json(getTree);
    } catch (error) {
        res.status.json(500);
    }
}

Tree.comfircookie = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        res.send(true);
    } catch (error) {
        res.status(500).json(error);
    }
}


Tree.getTree = async (req,res)=>{
    try {
        if(!req.user) return res.status(404).json("error");
        const findTree = await treeDataBase.findOne({email: req.user.email},{_id: 0,email: 0});
        if(!findTree) return res.status(200).json("no folders")
        const getTree = JSON.parse(findTree.tree);
        res.status(200).json(getTree);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = Tree;