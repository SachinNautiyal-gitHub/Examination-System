
const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({

    student:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"student"
    },                                                      

    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
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
    internalmarks:{
        type:Number,
        required:true,
        max:50
    },
    
    externalmarks:{
        type:Number,
        required:true,
        max:100
    }

});


module.exports = mongoose.model('subject', SubjectSchema);