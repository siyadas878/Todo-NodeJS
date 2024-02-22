const mongoose=require('mongoose')

const commentSchema=mongoose.Schema({
   text:{
    type:String,
    require:[true,'comment required']
   },
   user:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
   }
})

const Comment=mongoose.model('Comment',commentSchema)

module.exports=Comment