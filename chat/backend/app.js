const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json())
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test').then(()=>{
    console.log('Connection Successful')
}).catch(err=>{
    console.log(err)
})
const appRoutes = require('./routes/user.route')
app.use(cors());
app.options("*", cors());
app.use('/v1',appRoutes)

app.listen(4000,()=>{
    console.log('App is running');
})