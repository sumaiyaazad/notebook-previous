
// const mongoose=require('mongoose');
// mongoose.Promise=global.Promise;
// mongoose.connect('mongodb://localhost:27017/Keep');
// module.exports={mongoose};

// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://mahathir123:mahathir123@cluster0-rtbnv.mongodb.net/test?retryWrites=true&w=majority')
// const Cat = mongoose.model('Cat',{name: 'String'});
//
// const kitty = new Cat({name:'xinxian'});
// kitty.save().then(()=> console.log('meow'));

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://mahathir123:mahathir123@cluster0-rtbnv.mongodb.net/Keep?retryWrites=true&w=majority');
module.exports={mongoose};


