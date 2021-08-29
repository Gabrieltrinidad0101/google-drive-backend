const {Schema,model} = require("mongoose")


const TreeSchema = new Schema({
    name: String,
    path: String,
    folder: String,
    email: String,
    filename: String,
    mimetype: String,
    public: {
        type: Boolean,
        default: false
    }
})

module.exports = model("file",TreeSchema)