require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')


mongoose.connect('mongodb://127.0.0.1:27017/E-commerceApp-DB')
    .then(()=> console.log('E-commerceApp-DB connected!'))
    .catch((e)=> console.log(e))


const productRoutes = require('./APIs/productRoutes');
const authRoutes = require('./APIs/authRoutes');


app.use(cors({
    origin:['http://localhost:5173'],
    credentials: true
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())


app.use(productRoutes); 
app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
    res.send('Working Fine !');
})

const PORT = process.env.PORT || 4444;
app.listen(PORT,()=>{
    console.log('Server is up at PORT',PORT);
})
