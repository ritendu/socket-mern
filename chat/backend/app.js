const express = require('express');
const data = require('./data');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT?process.env.PORT:3000;
const app = express();
const cors = require('cors');  
app.use(cors());
app.get('/',(req,res)=>{
    res.send('App is running...')
})
app.get('/api/chats',(req,res)=>{
    res.send(data);
})

app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
})