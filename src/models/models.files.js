const {Schema,model} = require("mongoose")


const FileSchema = new Schema({
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

FileSchema.index({name: "text"})


module.exports = model("file",FileSchema)