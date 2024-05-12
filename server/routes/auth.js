const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const fetchuser = require('../middleware/fetchuser');




// Admin sign up
router.post('/registeradmin',[
    body('name', 'Enter a valid name').isLength({min : 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid Password').isLength({min : 8}),

  ], async (req, res) =>{
    
    let success  = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors : errors.array()});
    }
     try{
       let admin = await Admin.findOne({email : req.body.email});
       if(admin){
          return res.status(400).json({success, error : "user with this email already exits"});
       }
       
       const salt = await bcrypt.genSalt(10);
       const secPass = await bcrypt.hash(req.body.password, salt);
 
 
       user = await Admin.create({
          name : req.body.name,
          email : req.body.email,
          password : secPass,
          
       })
        
       success = true;
 
       const data = {
          admin:{
             id : admin.id
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


  // Teacher sign up
router.post('/registerteacher',[
   body('name', 'Enter a valid name').isLength({min : 3}),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Enter a valid Password').isLength({min : 8}),

 ], async (req, res) =>{
   
   let success  = false;
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors : errors.array()});
   }
    try{
      let teacher = await Teacher.findOne({email : req.body.email});
      if(teacher){
         return res.status(400).json({success, error : "user with this email already exits"});
      }
      
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);


      user = await Teacher.create({
         name : req.body.name,
         email : req.body.email,
         password : secPass,
         
      })
       
      success = true;

      const data = {
         teacher:{
            id : teacher.id
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
   body('name', 'Enter a valid name').isLength({min : 3}),
   body('email', 'Enter a valid email').isEmail(),
   body("fathername", 'this feild can bot be empty').isLength({min:1}),
   body('password', 'Enter a valid Password').isLength({min : 8}),
   body('branch', 'please fill the required feild').isLength({min : 1}),
   body('enrollment', 'this feild can not be empty').isLength({min : 2}),
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
          fathername:req.body.fathername,
          password : secPass,
          branch: req.body.branch,
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

  

  //Admin login 
  router.post('/adminlogin',[
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
     
      let admin = await Admin.findOne({email});
      if(!admin){
         return res.status(400).json({success, error : "Please try to login with correct credential"})
      }
 
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
         return res.status(400).json({success, error : "Please try to login with correct credential"})
      }
        
        success = true;
        const data = {
          admin:{
             id : admin.id
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



//  teacher login 

  router.post('/teacherlogin',[
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
    
     let teacher = await Teacher.findOne({email});
     if(!teacher){
        return res.status(400).json({success, error : "Please try to login with correct credential"})
     }

     const passwordCompare = await bcrypt.compare(password, user.password);
     if(!passwordCompare){
        return res.status(400).json({success, error : "Please try to login with correct credential"})
     }
       
       success = true;
       const data = {
         teacher:{
            id : teacher.id
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









module.exports = router;