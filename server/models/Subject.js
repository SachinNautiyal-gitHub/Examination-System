
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({

    student:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"student"
    },
    name:{
        type:String,
        required:true
    },
    
    subjectcode:{
        type:Number,
        required:true
    },
    
    semester:{
        type:String,
        required:true
    },

    


  

});


module.exports = mongoose.model('subject', SubjectSchema);