const {Schema,model} = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    storage: Number,
});


module.exports = model("user", userSchema);