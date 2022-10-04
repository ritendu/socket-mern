const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.listen(5000,()=>{
    console.log('App is running');
})