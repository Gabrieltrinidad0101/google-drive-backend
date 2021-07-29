const mongoose = require("mongoose");
"mongodb://localhost/google-drive"
mongoose.connect("mongodb+srv://gabrielTrinidada:gabrielTrinidada@cluster0.joar7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
    .then(_ => console.log("DB is connect"))
    .catch(error => console.log(error));