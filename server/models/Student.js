
const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    fatherName:{
        type:String,
        required : true
    },
    
    enrollment:{
       type:Number,
       required:true
    },
    password:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }
});



module.exports = mongoose.model('student', StudentSchema);
