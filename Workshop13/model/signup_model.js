const mongoose=require('mongoose')
 const dbConnect=require('./connection')


const dbSchema=new mongoose.Schema({
    name:String,
    login_id:String,
    password:String,
    role:String,
    designation:String
});

module.exports=mongoose.model('emp',dbSchema)