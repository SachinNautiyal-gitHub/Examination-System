const express = require('express');
const app = express();
const connectToDB = require('./db');


connectToDB();

app.use('/', (req, res)=>{
    res.send("hello from server");
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/data' , require('./routes/data'));


app.listen(5000, ()=>{
    console.log("server running at port 5000");
})