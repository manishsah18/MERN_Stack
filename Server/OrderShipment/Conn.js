const mongoose = require('mongoose')

const url = "mongodb://localhost:27017/DeliveryData";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection is ready to order shipment MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });