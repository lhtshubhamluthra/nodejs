const mongoose = require('mongoose');
const dbconect=require('./connection');
const dbModel = require('./model');
const express = require('express');
const app = express()

app.use(express.json())

app.post('/newUser', (req, res) => {

    const result = new dbModel({
        bookId: req.body.bookId,
        bookTitle: req.body.bookTitle,  
        bookAuthor: req.body.bookAuthor,
        bookPublisher: req.body.bookPublisher,
        bookPrice: req.body.bookPrice
    });

    result.save().then(data=>{

        res.status(201).json(data)

    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        });

    })


})


app.get('/allUsers', (req, res) => {

       const{page=1,limit=10} =req.query
       const bookName=req.query.bookTitle;
        dbModel.find({bookTitle:{$regex:bookName,$options:'i'}})
        .select({bookTitle:1})
        .sort({bookId:-1})
        .limit(limit*1)
        .skip((page-1)*limit)
        .then(final_result=>{

                res.status(200).send({result1:final_result})
        }).catch(err=>{
            console.log(err)
        })


})


app.listen(3000);