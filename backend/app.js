const express = require("express");
const app = express()
const cors = require("cors")

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());


const newsRoute = require('./routes/newsRoute')
app.use('/api/v1/news',newsRoute)

const adminRoute = require('./routes/adminRoute')
app.use('/api/v1/admin',adminRoute)

module.exports = app 