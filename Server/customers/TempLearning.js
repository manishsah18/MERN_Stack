// Learning


const db = "mongodb://localhost:27017/Employee"
mongoose.connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
}).then(()=>{
    console.log('connection susseful mongodb')
}).catch((err)=>console.log('mongodb error'))



const employeeSchema = new mongoose.Schema({
    Name:{ 
     type: String,
     required: true,
     unique: true,
     lowercase: true,
     trim: true,
     minlength: [10, "Minimum 10 letters allowed"],
     maxlength: 30
    },

    Language: {
      type: String,
      enum:["react", "angular", "nodeJs"],
      required: true,
      lowercase: true
    },

    Age: {
      type: Number,
      validate(value){
        if(value < 0){
          throw new Error("Age cannot be negative")
        }
      }
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Email is invalid");
        }
      }

    },


    Date: {
      type: Date,
      default: Date.now,
    },
  })

const Employee = new mongoose.model("Employee", employeeSchema);


const createDocument = async () => {
  try {
    const newcst = new Employee({
      Name: "vikram",
      Language: "angular",
      Age: "26",
      Email: "abc@goofle.com"
    });

    const angularComment = new Employee({
      Name: "      ManISh kUMar JhA        ",
      Language: "angular",
      Age: 66,
      Email: "abc@goofle.com"
    });


    // const result = await reactComment.save();
    const result = await Employee.insertMany([angularComment]);
    console.log(result);
  }
  catch (err) {
    console.log(err)
  }
}
createDocument();


const createDocument1 = async () => {
    try {
      const newcst2 = new customers({
        Name: "      ManISh kUMar Jha       ",
        Age: 66,
        Id: 1,
  
      });
  
  
      // const result = await reactComment.save();
      const result = await customers.insertMany([newcst2]);
      console.log(result);
    }
    catch (err) {
      console.log(err)
    }
  }
  // createDocument();
  
  const getDocument = async () =>{
    const result = await Employee
    .find({Age: {$gt: "25"}})
    // .find({$or: [{Age : "26"}, {Language : "React"}]})
    // .find({$and: [{Age :" 66"}, {Language : "React"}]})
    .select({Name:1})
    // .limit(4)
    .sort({Name:1})
    // .countDocuments() //to count no of documents
    
    console.log(result)
  }
  
  // getDocument();
  
  // comparision operator//
  
  // $eq
  // Matches values that are equal to a specified value.
  // $gt
  // Matches values that are greater than a specified value.
  // $gte
  // Matches values that are greater than or equal to a specified value.
  // $in
  // Matches any of the values specified in an array.
  // $lt
  // Matches values that are less than a specified value.
  // $lte
  // Matches values that are less than or equal to a specified value.
  // $ne
  // Matches all values that are not equal to a specified value.
  // $nin
  // Matches none of the values specified in an array.
  
  
  //Logical operator//
  
  
  // $and
  // Joins query clauses with a logical AND returns all documents that match the conditions of both clauses.
  // $not
  // Inverts the effect of a query expression and returns documents that do not match the query expression.
  // $nor
  // Joins query clauses with a logical NOR returns all documents that fail to match both clauses.
  // $or
  // Joins query clauses with a logical OR returns all documents that match the conditions of either clause.
  
  
  const updateDocument = async(_id) =>{
  
  try{
    // const result = await Employee.updateOne({_id}, {
      const result = await Employee.findByIdAndUpdate({_id}, {
      $set: {Name: 'Ranjan Jha'}
    },{
      new: true,
      useFindAndModify : false
    }
    )
    console.log(result)
  
  }catch(err){
    console.log(err)
  }
  }
  // updateDocument('62a187ddcbd6c8c72c216f6c');
  
  
  const deleteDocument = async (_id) =>{
    try{
      // const result = await Employee.deleteOne({_id});
      const result = await Employee.findByIdAndDelete({_id});
      console.log(result);
      }catch(err){console.log(err);}}
  
  
  // deleteDocument('62a2c439267c5ae6f3a1571b');
  
  
  