const mongoose= require("mongoose");

const newsSchema=mongoose.Schema({
    title:{
        type:String,
        require:[true,"please enter the title of the news"]
    },
    place:{
        type:String,
        require:[true,"please enter the place of the news"]
    },
    description:{
        type:String,
        require:[true,"please enter the description of the news"]
    },
    category:{
        type:String,
        require:[true,"please enter the category of the news"]
    },
    status:{
        type:String,
        enum :["draft","in-review","scheduled","approved","published"],
        default:"draft"
    },
    author:{
        type:String,
        require:[true,"please enter the author of the news"]
    },
    image:{
        type:String,
    }
})

const News = mongoose.model('news',newsSchema)
module.exports= News;
