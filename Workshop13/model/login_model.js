const mongoose=require('mongoose');
const dbConnect=require('./connection');

loginSchema=new mongoose.Schema({
    login_id:String,
    password:String
});

module.exports=mongoose.model('emp',loginSchema);
