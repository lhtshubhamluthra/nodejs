const dbconect=require('./connection');
const dbSchema=require('./schema');
const mongoose=require('mongoose');

module.exports=mongoose.model('book_details', dbSchema);