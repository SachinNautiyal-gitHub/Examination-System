
const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const Student = require('../models/Student');
const Result = require("../models/Result");
const Subject = require('../models/Subject');
const Teacher = require('../models/Teacher');
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
        let studentId = req.user.id;
        const student = Student.findById(studentId).select("-password");
        res.send(student);
    } catch (error) {
        console.log(error.massage);
        res.status(500).send('Internal server Error');
    }
})

router.get('/subjects', fetchUser, async(req,res)=>{
    try {
       let subjects = Subject.find({student:req.user.id});
       res.json({subjects});
        
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
        
    }
})


router.get('/results', fetchUser, async(req,res)=>{ 
    try {
        let results = Result.find({student:req.student.id});
        res.josn({results});
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }
})




router.post('/addsubject', fetchUser,[
   
    body('name', "this feild can not be empty").isLength({min : 2}),
    body('subjectcode', "this feild can not be empty").isLength({min : 2}),
    body('semester', "this feild can not be empty").isLength({min : 2}),
    body('internalmarks', "this feild can not be empty").isLength({min : 2}),
    body('externalmarks', "this feild can not be empty").isLength({min : 2}),

], async(req, res)=>{
   
    let success = false;
    let errors = validationResult(req);

    if(!errors.isEmpty()){
       return res.status(400).json({success, error:"please fill all the required feilds"});
    }

    
    try {
        const {name, subjectcode, semester, internalmarks, externalmarks} = req.body;
        const sub = new Subject({
            name, subjectcode, semester, internalmarks, externalmarks, student:req.student.id, teacher:req.teacher.id
        })
        
        const savedSub = await sub.save();
        
        let result = await Result.findOne({semester, student:req.student.id});
        if(!result){
            const newResult = await Result.create({semester, student:req.student.id});
            result = newResult;
        }

        result.subjects.push({subject:subject._id});
        await result.save();

       res.status(200).send("Subject added Successfully");

        
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server Error");
    }


    
});




router.delete('/deletesubject:id', fetchUser, async(req, res)=>{
    let subject = await Subject.findById(req.params.id);
    if(!subject){
        return res.status(400).send("Not Found");
    }
    
    if(subject.teacher.toString() !== req.params.id){
        return res.status(401).send("Not Allowed");
    }

    subject = await Subject.findByIdAndDelete(req.params.id);
    res.json({"Success":"Subject has beem deleted succesfully"});
})



// router.post('/addresult', fetchUser,[
//     body('semster','please fill the required feild').isLength({min:1})
// ], async(req, res)=>{
//     let success = false;
//     let errors = validationResult(req);

//     if(!errors.isEmpty()){
//         res.status(400).json({success:"please fill the required feilds"});
//     }

//     try {
//         const {semester} = req.body;
//         const result = new Result ({
//          student:req.student.id, semester  
//         })

//         const savedResult = await result.save();
//         res.send({savedResult});
        
//     } catch (error) {
//         console.log(error.massage);
//         res.status(500).send('Internal Server Error');
//     }


// })




router.get('/teacherslist', fetchUser, async(req, res)=>{
    try {
        let teachers = await Teacher.find();
        res.send(teachers);
    } catch (error) {
        console.log(error.massage);
        res.status(500).send("Internal server error");
    }
})



module.exports = router;