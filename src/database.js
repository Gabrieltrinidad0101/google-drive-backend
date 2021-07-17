const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB,{
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})
    .then(_ => console.log("DB is connect"))
    .catch(error => console.log(error));


    /* google-drive-frontend- */