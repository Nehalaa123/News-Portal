const mongoose = require("mongoose");

const databaseConnection = () =>{
    mongoose.connect(process.env.DB_URI).then((res)=>{
        console.log(`database connect with ${res.connection.host}`);
        
    }).catch((err)=>{
        console.log(err);
        
    })
}

module.exports = databaseConnection
