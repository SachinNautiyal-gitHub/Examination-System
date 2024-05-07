
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.SECRET_KEY;

const fetchUser = (req, res, next)=>{
   const token = req.header('auth-token');
   if(!token){
     return res.status(401).send({error : "Accessed Denied"});
   }

   try{
     
       const data = jwt.verify(token, JWT_SECRET);
       return req.user = data.user;
       next();
   }
   catch(error){
       return res.status(401).send({error:"Access Denied : Invalid Token"});
   }  
}

module.exports = fetchUser;