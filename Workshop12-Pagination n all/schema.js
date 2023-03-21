const dbconect=require('./connection');
const mongoose=require('mongoose');


module.exports= mongoose.Schema({
    bookId: String,
    bookTitle: String,
    bookAuthor: String,
    bookPublisher: String,
    bookPrice: Number
})

