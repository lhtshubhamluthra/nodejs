const mongoose=require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/users')
// (err)=>{
// if(err){
//     console.log(err)
// }else{
//     console.log('Successfully connected')
// }
// })

createUserSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    age:Number,
    
})



model=mongoose.model('userData',createUserSchema);

module.exports=model