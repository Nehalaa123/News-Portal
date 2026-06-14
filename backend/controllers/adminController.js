const Admin = require('../models/adminModel');
const bcrypt = require("bcrypt");

//register
exports.register = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success :false,
                message:"please fill the input"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const admin = await Admin.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            success:true,
            message:"Register successfully",
            admin
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//login
exports.login = async(req,res)=>{
    const {email,password} = req.body
    try {
        const admin = await Admin.findOne({email})
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        )
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"invalid password"
            })
        }
        res.status(200).json({
            success:true,
            message:"login successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//profile
exports.profile = async(req,res)=>{
    try {
        const {email} = req.query;
        const admin = await Admin.findOne({email})
        if(!admin){
          return  res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }
        res.status(200).json({
            success:true,
            admin
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//change password
exports.changePassword = async(req,res)=>{
    try {
        const {email,oldPassword,newPassword} = req.body
        console.log(req.body);
        console.log(oldPassword);
        console.log(newPassword);
       
        const admin = await Admin.findOne({email})
         console.log(admin.password);
        if(!admin){
            return res.status(400).json({
                success:false,
                message:"admin not found"
            })
        }
        const isMatch = await bcrypt.compare(
            oldPassword,
            admin.password
        )
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"password is incorrect"
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword,10)
        admin.password = hashedPassword
        await admin.save()
        res.status(200).json({
            success:true,
            message:"password changed successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}