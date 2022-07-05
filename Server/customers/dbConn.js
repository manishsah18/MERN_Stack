const mongoose = require('mongoose')


const db = "mongodb://localhost:27017/Customers"
mongoose.connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
    console.log('connection successful customers mongodb')
}).catch((err)=>console.log('mongodb error'))