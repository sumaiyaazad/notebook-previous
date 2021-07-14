var mongoose=require('mongoose');
var User=mongoose.model('User',{
  username:{
    required:true,
    trim: true,
    type: String,
    minlength:1
  },
  password:{
    required:true,
    type:String,
    trim:true,
    minlength:1
  }
});


module.exports={User}
