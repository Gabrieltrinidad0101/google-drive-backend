const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
    .then(_ => console.log("DB is connect"))
    .catch(error => console.log(error));