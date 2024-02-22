const mongoose = require('mongoose');


const todoSchema=mongoose.Schema({
  text:{
    type:String,
    require:[true,'a todo need a text'],
  },
  completed:{
    type:Boolean,
    default:false
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'User'
  },
  coment:[
     {
      type:mongoose.Schema.ObjectId,
      ref:'Comment'
     }
  ],
  likes:[
    {
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }
  ]
})

todoSchema.pre(/^find/,function(){
  this.populate('user').populate('coment')
  console.log(this)
})

const Todo=mongoose.model('Todo',todoSchema)

  module.exports=Todo



