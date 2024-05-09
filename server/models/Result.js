
const mongoose = require('mongoose');


const ResultSchema = new mongoose.Schema({

    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref : "Student"
    },
    semester:{
        type:String,
        required:true
    },
    subjetcs:[{
       subject:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Subject"
       }
    }]
    
});



module.exports = mongoose.model("result", ResultSchema);