const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Note}=require('./models/note');
var {User}=require('./models/user');

var app=express();


app.use(bodyParser.json());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

var result={
    "success":"",
    "message":""
};


app.post('/signin',(req,res)=>{
   User.findOne({username:req.body.username}).then((user)=>{
    if(!user){
      result.success=false;
      result.message="Username not found";
      return res.send(result);
    }
    if(user.password!==req.body.password){
      result.success=false;
      result.message="Sorry!Password didn't match";
      return res.send(result);
    }
  result.success=true;
  result.message="Successful login";
  res.send(result);
  },(e)=>{
    result.success=false;
    result.message="Error Occured in /signin api";
    res.send(result);
  });
});


app.post('/signup',(req,res)=>{
  User.findOne({username:req.body.username}).then((user)=>{
    if(user){
      result.success=false;
      result.message="Username already exists";
      return res.send(result);
    }
  var newuser=new User({
    username: req.body.username,
    password: req.body.password,
  });
  newuser.save().then((user)=>{
    result.success=true;
    result.message="User Created. Successful sign up";
    res.send(result);
  },(e)=>{
    result.success=false;
    result.message=`Error Occured in /signup api`;
    res.send(result);
  });
});
});


app.post('/remove',(req,res)=>{
   User.findOneAndRemove({username:req.body.username,password:req.body.password}).then((user)=>{
    if(!user){
      result.success=false;
      result.message="Invalid password";
      return res.send(result);
    }
  result.success=true;
  result.message="Successful deletion";
  res.send(result);
},(e)=>{
    result.success=false;
    result.message="Error Occured in /remove api";
    res.send(result);
  });
});


app.post('/changepassword',(req,res)=>{
  User.findOneAndUpdate({username:req.body.username, password:req.body.password}
      , {$set: {password : req.body.newpassword}}
      , {returnOriginal: false}
    ).then((user)=> {
      if(!user){
          result.success=false;
          result.message="Invalid information";
          return res.send(result);
        }
        result.success=true;
        result.message="Password changed for user";
        res.send(result);
    },(e)=>{
      result.success=false;
      result.message=`Error Occured in /changepassword api`;
      res.send(result);
    });
});


app.post('/newnote',(req,res)=>{
  User.findOne({username:req.body.username,password:req.body.password}).then((user)=>{
    if(!user){
      result.success=false;
      result.message="Invalid information";
      return res.send(result);
    }
  var newnote=new Note({
    username: req.body.username,
    text: req.body.text,
  });
  newnote.save().then((note)=>{
    result.success=true;
    result.message="New Note Created.";
    res.send(result);
  },(e)=>{
    result.success=false;
    result.message=`Error Occured /newnote api`;
    res.send(result);
  });
});
});


app.post('/getnotes',(req,res)=>{
  User.findOne({username:req.body.username, password:req.body.password}).then((user)=>{
    if(!user){
      result.success=false;
      result.message="Invalid information";
      return res.send(result);
    }
    Note.find({username:req.body.username}).then((notes)=>{
      res.send({notes});
    },(e)=>{
      result.success=false;
      result.message=`Error Occured in /getnotes api`;
      res.send(result);
    });
  },(e)=>{
    result.success=false;
    result.message=`Error Occured in /getnotes api`;
    res.send(result);
  });
});
app.post('/getusers',(req,res)=>{
    User.find({}).then((users)=>{
        for(var i=0;i<users.length;i++)
        {   var p=users[i].username.toLowerCase().includes(req.body.name.toLowerCase());
            console.log(users[i].username,': ',p);
            if(!p){
                users.splice(i,1);
                i-=1;
            }
        }
        res.send({users});
    },(e)=>{
        result.success=false;
        result.message=`Error Occured in /getusers api`;
        res.send(result);
        console.log(e);
    });

});

app.post('/getusernotes',(req,res)=>{
    Note.find({username:req.body.name}).then((usernotes)=>{
        res.send({usernotes});
    },(e)=>{
        result.success=false;
        result.message=`Error Occured in /getusers api`;
        res.send(result);
        console.log(e);
    });

});


app.post('/deletenote',(req,res)=>{
    User.findOne({username:req.body.username,password:req.body.password}).then((user)=>{
        if(!user){
            result.success=false;
            result.message="Invalid information";
            return res.send(result);
        }
        Note.findByIdAndRemove(req.body._id).then((note)=>{
            if(!user){
                result.success=false;
                result.message="Invalid note id";
                return res.send(result);
            }
            result.success=true;
            result.message="Note deleted";
            res.send(result);
        },(e)=>{
            result.success=false;
            result.message=`Error Occured in /deletenote api`;
            res.send(result);
        });
    },(e)=>{
        result.success=false;
        result.message=`Error Occured in /deletenote api`;
        res.send(result);
    });
});


app.post('/editnote',(req,res)=>{
  User.findOne({username:req.body.username,password:req.body.password}).then((user)=>{
   if(!user){
     result.success=false;
     result.message="Invalid information";
     return res.send(result);
   }
   Note.findByIdAndUpdate(req.body._id,{$set:{text:req.body.text}},{new: true}).then((note)=>{
     if(!note){
       result.success=false;
       result.message="Invalid note id";
       return res.send(result);
     }
     result.success=true;
     result.message="Note edited";
     res.send(result);
   }).catch((e)=>{
     res.status(400).send();
   })
},(e)=>{
   result.success=false;
   result.message=`Error Occured in /editnote api`;
   res.send(result);
 });
});


app.listen(4000,()=>{
  console.log('Node.js api Started on port 4000');
});
