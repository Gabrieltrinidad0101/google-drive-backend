const {Schema,model} = require("mongoose")


const TreeSchema = new Schema({
    tree: String,
    email: String
})

module.exports = model("tree",TreeSchema)