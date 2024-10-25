const express = require('express')
const cors = require('cors')
require('dotenv').config();
const Transaction = require('./models/Transaction.js')
const mongoose = require('mongoose')
const connectDB = require('../config/connectdb.js')


const app = express();
const DATABASE_URL = "mongodb://localhost:27017"

app.use(cors());
connectDB(DATABASE_URL)
app.use(express.json())
app.get("/api/test", (req,res)=>{
    res.json('test ok1');
});

app.post('/api/transaction', async (req,res)=>{
    await mongoose.connect(DATABASE_URL)
    const {name, description,datetime} = req.body()
    res.json(req.body);
});

app.listen(4040, ()=>{
    console.log(DATABASE_URL)
    console.log("app listening at port 4040")
});




