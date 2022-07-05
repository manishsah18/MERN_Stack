const mongoose = require('mongoose')
var validator = require('validator');
var dateTime = require('node-datetime');


var date = dateTime.create().format('d-m-y H:M:S');

const customerSchema = new mongoose.Schema({
    
    Name:{ 
     type: String,
     required: true,
     unique: true,
     lowercase: true,
     trim: true,
     minlength: [2, "Minimum 2 letters allowed"],
     maxlength: 30
    },

    Age: {
      type: Number,
      validate(value){
        if(value < 0){
          throw new Error("Age cannot be negative")
        }
      }
    },

    Id: {
        type: Number,
        validate(value){
          if(value < 0){
            throw new Error("Id cannot be negative")
          }
        }
      },

    CreatedAt: {
      type: String,
      default: date,
    },
  })

const customers = new mongoose.model("customers", customerSchema);

module.exports = customers;