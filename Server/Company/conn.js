const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/Company";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection is ready to company factory MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });