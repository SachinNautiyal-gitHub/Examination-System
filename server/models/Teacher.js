
const mongoose = require('mongoose');


const TeacherSchema = new mongoose.Schema({

    name:{
        type:String,
        required : true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    assignSubjects:[
        {
            subject:{
                type:mongoose.Schema.Types.ObjectId,
             }
        }
    ],

    date:{
        type:Date,
        default:Date.now
    },
    

});



module.exports = mongoose.model('teacher',TeacherSchema);