var mongoose=require('mongoose');
var Note=mongoose.model('Note',{
  username:{
    required:true,
    trim: true,
    type: String,
    minlength:1
  },
  text:{
    required:true,
    type: String,
  }
});


module.exports={Note}
