
const mongoose = require('mongoose');


const ResultSchema = new mongoose.Schema({

    student:{
      type:mongoose.Schema.Types.ObjectId,
      ref : "student"
    },
    semester:{
        type:String,
        required:true
    },
    
});



module.exports = mongoose.model("result", ResultSchema);