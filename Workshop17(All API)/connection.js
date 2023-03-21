const mongoose=require('mongoose')
module.exports=mongoose.connect('mongodb://0.0.0.0:27017/employee');
mongoose.connection.on('connected',connected=>{
    console.log('connected to db');
})