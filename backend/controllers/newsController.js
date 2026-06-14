const News = require('../models/newsModel');
const { stack } = require('../routes/adminRoute');


//create news
exports.createNews=async(req,res)=>{
    const{title,place,description,category,author,image}=req.body;
    if(!title||!place||!description||!category||!author||!image){
        return res.status(400).json({
            status:false,
            message:"please fill the input"
        })
    }
      try {
        const newsData  = {
            title,
            place,
            description,
            category,
            author,
            image
        };
        const newsPortal = await News.create(newsData )
        console.log("newsssss--->",newsPortal);
        return res.status(201).json({
            success:true,
            message:"news added successfully",
            newsPortal
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//edit news
exports.updateNews = async(req,res)=>{
    try {
        const updatedNews = await News.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )
        res.status(200).json({
            success:true,
            message:"updated seccssfully",
            updatedNews
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//delete news
exports.deleteNews = async(req,res)=>{
    const {id} = req.params
    try {
        const deletedNews = await News.findByIdAndDelete(id)
        if(!deletedNews){
            res.status(400).json({
                success:false,
                message:"invalid"
            })
        }
        res.status(200).json({
            success:true,
            message:"deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get all news
exports.getAllNews = async(req,res)=>{
    try {
        const getnews = await News.find()
        res.status(200).json({
            success:true,
            message:"All News",
            getnews
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get draft news
exports.getDraftNews= async(req,res)=>{
    try {
        const draftedNews = await News.find({status:"draft"})
        if(draftedNews.length === 0){
            res.status(400).json({
                success:false,
                message:"No dfrat news"
            })
        }
        res.status(200).json({
            success:true,
            message:"Draft News",
            draftedNews
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get in-review news
exports.getInreviewNews = async(req,res)=>{
    try {
        const inreviewedNews = await News.find({status:"in-review"})
        if(inreviewedNews.length === 0){
            res.status(400).json({
                success:false,
                message:"No in-review news"
            })
        }
        res.status(200).json({
            success:true,
            message:"in-review News",
            inreviewedNews
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get scheduled news
exports.getScheduleNews = async(req,res)=>{
    try {
        const scheduledNews = await News.find({status:"scheduled"})
        if(scheduledNews.length === 0){
            res.status(400).json({
                success:false,
                message:"No scheduled news"
            })
        }
        res.status(200).json({
            success:true,
            message:"Scheduled News",
            scheduledNews
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get published news
exports.getPublishedNews = async(req,res)=>{
    try {
        const publishedNews = await News.find({status:"published"})
        if(publishedNews.length === 0){
            res.status(400).json({
                success:false,
                message:"No published news"
            })
        }
        res.status(200).json({
            success:true,
            message:"published News",
            publishedNews
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//home page
exports.homePage = async(req,res) =>{
    try {
        const news = await News.find({
            status :"published"
        })
        res.status(200).json({
            success:true,
            news
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//category wise news
exports.getNewsByCategory = async(req,res) =>{
    try {
        console.log("category",req.params.category);
        
        const news = await News.find({
            category :req.params.category,
            
        })
        console.log("found news",news);
        
        res.status(200).json({
            success:true,
            news
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//single news
exports.singleNews = async(req,res) =>{
    try {
        const news = await News.findById(req.params.id)
        if(!news){
            res.status(404).json({
                success:true,
                message:"news not found"
            })
        }
        res.status(200).json({
            success:false,
            news
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}