
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const mongoUri = process.env.DB_KEY;


const connectToDB = async ()=>{
     try {
        await mongoose.connect(mongoUri);
        console.log("Connected to Database");
     } catch (error) {
         console.log("Unable to connect to Database",error);
         
     }
    
}


module.exports= connectToDB;