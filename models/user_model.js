const mongoose = require('mongoose');


  const userSchema=mongoose.Schema({
    username:{
      type:String,
      require:[true,'name required'],
    },
    password:{
      type:String,
      require:[true,'password required'],
    },
  })

  const User=mongoose.model('User',userSchema)

  module.exports=User