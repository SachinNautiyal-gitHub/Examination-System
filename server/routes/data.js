
const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const Student = require('../models/Student');
const Result = require("../models/Result");
const Subject = require('../models/Subject');
const {body, validationResult} = require('express-validator');
const router = express.Router();



router.get('/students', fetchUser, async(req, res)=>{   // all student list  - /api/data/students
    try {
        const students = Student.find();
        res.send(students);
    } catch (error) {
        console.log(error.massage);
        res.status(500).send('Internal server error');
    }
})


router.get('/students:id', fetchUser, async(req, res)=>{
    try {
        const student = Student.find({student:req.student.id});
        res.send(student);
    } catch (error) {
        console.log(error.massage);
        res.status(500).send('Internal server Error');
    }
})


router.get('/result:id', fetchUser, async(req,res)=>{ 
    try {
        let result = Result.find({student:req.student.id});
        res.josn({result});
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }
})


router.post('/addsubject', fetchUser, async(req, res)=>{
    
});


router.put('editsubjectdetails:id', fetchUser, async(req,res)=>{

})


router.delete('/deletesubject:id', fetchUser, async(req, res)=>{

})



router.post('/addresult', fetchUser, async(req, res)=>{

})


router.put('/editresult', fetchUser, async(req, res)=>{

})


router.delete('/deleteresult', fetchUser, async(req, res)=>{

})


router.get('/teacherslist', fetchUser, as)



module.exports = router;