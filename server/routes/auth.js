const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');




// user sign up
router.post('/registeruser',[
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid Password').isLength({min : 8})
  ], async (req, res) =>{
    
    let success  = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
    }
     try{
       let user = await User.findOne({email : req.body.email});
       if(user){
          return res.status(400).json({success, error : "user with this email already exits"});
       }
       
       const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password, salt);
 
 
       user = await User.create({
          name : req.body.name,
          email : req.body.email,
          password : secPass,
          isadmin:req.body.isadmin,
          isteacher:req.body.isteacher
       })
        
       success = true;
 
       const data = {
          user:{
             id : user.id
          }
       }
       const authToken =  jwt.sign(data, JWT_SECRET);
       console.log(success,authToken);
       
       res.json({success,authToken});
 
     }
     catch(error){
 
       console.log(error.massage);
       res.status(500).send("Internal server error");
 
     }
 
  });


  // student sign-up

  router.post('/registerstudent',[
    body('name', 'Enter a valid name').isLength({min : 4}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid Password').isLength({min : 8})
  ], async (req, res) =>{
    
    let success  = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
    }
     try{
       let student = await Student.findOne({email : req.body.email});
       if(student){
          return res.status(400).json({success, error : "user with this email already exits"});
       }
       
       const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password, salt);
 
 
       student = await Student.create({
          name : req.body.name,
          email : req.body.email,
          password : secPass,
          fathername:req.body.fathername,
          enrollment:req.body.enrollment
       })
        
       success = true;
 
       const data = {
          student:{
             id : student.id
          }
       }
       const authToken =  jwt.sign(data, JWT_SECRET);
       console.log(success,authToken);
       
       res.json({success,authToken});
 
     }
     catch(error){
 
       console.log(error.massage);
       res.status(500).send("Internal server error");
 
     }
 
  });

  

  //user login 
  router.post('/userlogin',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
 ], async(req, res) =>{
    
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({error  : errors.array()})
    }
 
   const {email, password} = req.body;
 
   try {
     
      let user = await User.findOne({email});
      if(!user){
         return res.status(400).json({success, error : "Please try to login with correct credential"})
      }
 
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
         return res.status(400).json({success, error : "Please try to login with correct credential"})
      }
        
        success = true;
        const data = {
          user:{
             id : user.id
          }
       }
       const authToken =  jwt.sign(data, JWT_SECRET);
       console.log(success,authToken);
      
       res.json({success,authToken});
 
   }  catch(error){
 
       console.log(error.massage);
       res.status(500).send(" Internal server Error ");
 
     }
 });


 //student login 
 router.post('/studentlogin',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
 ], async(req, res) =>{
    
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({error  : errors.array()})
    }
 
   const {email, password} = req.body;
 
   try {
     
      let student = await Student.findOne({email});
      if(!student){
         return res.status(400).json({success, error : "Please try to login with correct credential"})
      }
 
      const passwordCompare = await bcrypt.compare(password, student.password);
      if(!passwordCompare){
         return res.status(400).json({success, error : "Please try to login with correct credential"})
      }
        
        success = true;
        const data = {
          student:{
             id : student.id
          }
       }
       const authToken =  jwt.sign(data, JWT_SECRET);
       console.log(success,authToken);
      
       res.json({success,authToken});
 
   }  catch(error){
 
       console.log(error.massage);
       res.status(500).send(" Internal server Error ");
 
     }
 });


 //get user
 router.post('/getuser', fetchuser, async(req, res) =>{

    try {
       let userId = req.user.id;
       const user = await User.findById(userId).select("-password");
       res.send(user);
    } catch (error) {
       console.log(error.massage);
       res.status(500).send(" Internal server Error ");
    }
    
})


// get student
router.post('/getstudent', fetchuser, async(req, res) =>{

    try {
       let studentId = req.user.id;
       const student = await User.findById(studentId).select("-password");
       res.send(student);
    } catch (error) {
       console.log(error.massage);
       res.status(500).send(" Internal server Error ");
    }
    
})







module.exports = router;