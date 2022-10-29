const express = require('express');
const data = require('./data');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const {errorHandler,notFound} = require('./middlewares/errorMiddleware')
dotenv.config();
connectDB();
const PORT = process.env.PORT?process.env.PORT:3000;
const app = express();
const cors = require('cors');  
app.use(cors());
const userRoutes = require('./routes/userRoutes');
const userChats = require('./routes/userChats')
app.use(express.json());
app.use('/api',userRoutes);
app.use('/chat',userChats)
app.use(notFound);
app.use(errorHandler);
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
})